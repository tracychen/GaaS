import {
  ContractInteractionGateConfiguration,
  Gate,
  GateType,
  Period,
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

export async function evaluateGate(
  gate: Gate,
  address: string
): Promise<boolean> {
  if (!address || !ethers.utils.isAddress(address)) {
    throw new Error(`Address ${address} is not a valid address`);
  }

  const provider = getProvider(gate.chainId);

  if (gate.gateType !== GateType.CONTRACT_INTERACTION) {
    throw new Error(`Gate type ${gate.gateType} not supported`);
  }
  const gateConfiguration =
    gate.gateConfiguration as ContractInteractionGateConfiguration;

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
  const endBlock = await convertPeriodToBlockRange(gate, provider);
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
    if (matchingLogs.length >= gateConfiguration.requiredInteractions) {
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
  gate: Gate,
  provider: providers.JsonRpcProvider
): Promise<number> {
  const dater = new EthDater(provider);
  const periodSeconds = getSecondsFromPeriod(gate.period);
  const secondsRange = periodSeconds * gate.evaluationPeriod;
  const startDate = subtractSeconds(new Date(), secondsRange);
  const blockResult = await dater.getDate(startDate);
  return blockResult.block;
}
