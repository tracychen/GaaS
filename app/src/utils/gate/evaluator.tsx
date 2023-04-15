import {
  EventsEmittedGateConfiguration,
  Gate,
  GateType,
  Period,
  ReadContractInfoGateConfiguration,
} from "@/types/gate";
import { ethers, providers } from "ethers";
import { getJsonRpcProvider } from "../provider";

import EthDater from "ethereum-block-by-date";
import { getLogs } from "../quicknode-client";
import { CHAIN_CONFIGS } from "../env";

function getProvider(chainId: number) {
  const chainName = Object.keys(CHAIN_CONFIGS).find(
    (chain) => CHAIN_CONFIGS[chain].chainID === chainId
  );

  if (!chainName) {
    throw new Error(`Chain ID ${chainId} not supported`);
  }
  return getJsonRpcProvider(chainName);
}

export async function evaluateGate(gate: Gate, address: string) {
  if (!address || !ethers.utils.isAddress(address)) {
    throw new Error(`Address ${address} is not a valid address`);
  }

  const provider = getProvider(gate.chainId);

  if (gate.gateType === GateType.EVENTS_EMITTED) {
    return evaluateEventsEmittedGate(gate, address, provider);
  } else if (gate.gateType === GateType.READ_CONTRACT_INFO) {
    return evaluateReadContractInfoGate(gate, address, provider);
  } else {
    throw new Error(`Gate type ${gate.gateType} not supported`);
  }
}

async function evaluateReadContractInfoGate(
  gate: Gate,
  address: string,
  provider: providers.JsonRpcProvider
) {
  if (gate.gateType !== GateType.READ_CONTRACT_INFO) {
    throw new Error(`Gate type ${gate.gateType} not supported`);
  }
  const gateConfiguration =
    gate.gateConfiguration as ReadContractInfoGateConfiguration;

  // TODO: get this from somewhere kei throws it
  const abi = [
    "function getApeCoinStake(address _address) public view returns ((uint256 poolId, uint256 tokenId, uint256 deposited, uint256 unclaimed, uint256 rewards24hr, (uint256 mainTokenId, uint256 mainTypePoolId) pair) memory)",
  ];
  const contract = new ethers.Contract(gate.contractAddress, abi, provider);
  console.log({ contract });
  const callResult = await contract[gateConfiguration.method](address);
  let value = callResult;
  if (gateConfiguration.resultKey) {
    value = callResult[gateConfiguration.resultKey];
  }
  if (value._isBigNumber) {
    // TODO: handle other types, assume 18 decimals for now
    value = ethers.utils.formatEther(value);
  }

  const operator = gateConfiguration.comparison.operator;
  const comparisonValue = gateConfiguration.comparison.value;
  switch (operator) {
    case ">":
      return value > comparisonValue;
    case ">=":
      return value >= comparisonValue;
    case "<":
      return value < comparisonValue;
    case "<=":
      return value <= comparisonValue;
    case "==":
      return value === comparisonValue;
    case "!=":
      return value !== comparisonValue;
    default:
      throw new Error(`Operator ${operator} not supported`);
  }
}

async function evaluateEventsEmittedGate(
  gate: Gate,
  address: string,
  provider: providers.JsonRpcProvider
): Promise<boolean> {
  if (gate.gateType !== GateType.EVENTS_EMITTED) {
    throw new Error(`Gate type ${gate.gateType} not supported`);
  }
  const gateConfiguration =
    gate.gateConfiguration as EventsEmittedGateConfiguration;

  const matchingLogs = [];

  // TODO: get this from somewhere kei throws it
  const abi = [
    "event Deposit (address indexed user, uint256 amount, address recipient)",
  ];

  const iface = new ethers.utils.Interface(abi);
  const eventHexString = iface.getEventTopic(gateConfiguration.event);
  let topics = [eventHexString];

  // If address to check is an indexed arg, add it to topics
  if (gateConfiguration.addressArgument.indexed !== undefined) {
    topics.push(ethers.utils.hexZeroPad(address, 32));
  }
  const endBlock = await convertPeriodToBlockRange(
    gateConfiguration.period,
    gateConfiguration.evaluationPeriod,
    provider
  );
  const currentBlock = await provider.getBlockNumber();
  let toBlock = currentBlock;
  let fromBlock = Math.max(toBlock - 10000, endBlock);
  while (fromBlock >= endBlock) {
    const logs = await getLogs(
      topics,
      gate.contractAddress,
      fromBlock,
      toBlock
    );

    for (const log of logs) {
      const parsedLog = iface.parseLog(log);
      console.log({ parsedLog });
      if (
        // if address matches the specified address argument
        address.toLowerCase() ===
        parsedLog.args[
          gateConfiguration.addressArgument.argumentName
        ].toLowerCase()
      ) {
        matchingLogs.push(log);
      }
    }
    // Check if number of matching logs is greater than or equal to required interactions
    // TODO aggregate by tx
    if (matchingLogs.length >= gateConfiguration.requiredCount) {
      return true;
    }
    if (fromBlock === endBlock) {
      break;
    }
    toBlock = fromBlock - 1;
    fromBlock = Math.max(toBlock - 10000, endBlock);
  }

  return false;
}

function getSecondsFromPeriod(period: Period): number {
  switch (period) {
    case "hour":
      return 60 * 60;
    case "day":
      return 60 * 60 * 24;
    case "week":
      return 60 * 60 * 24 * 7;
    case "month":
      return 60 * 60 * 24 * 30;
    case "year":
      return 60 * 60 * 24 * 365;
    default:
      throw new Error("Invalid period");
  }
}

function subtractSeconds(date: Date, seconds: number) {
  date.setSeconds(date.getSeconds() - seconds);
  return date;
}

async function convertPeriodToBlockRange(
  period: Period,
  evaluationPeriod: number,
  provider: providers.JsonRpcProvider
): Promise<number> {
  const dater = new EthDater(provider);
  const periodSeconds = getSecondsFromPeriod(period);
  const secondsRange = periodSeconds * evaluationPeriod;
  const startDate = subtractSeconds(new Date(), secondsRange);
  const blockResult = await dater.getDate(startDate);
  return blockResult.block;
}
