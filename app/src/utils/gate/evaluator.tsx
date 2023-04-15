import { Criteria, Gate, Period } from "@/types/gate";
import { ethers } from "ethers";
import { getJsonRpcProvider } from "../provider";

import EthDater from "ethereum-block-by-date";
import { getLogs } from "../quicknode-client";

const provider = getJsonRpcProvider("mainnet");

export async function evaluateGate(
  gate: Gate,
  address: string
): Promise<boolean> {
  if (!address || !ethers.utils.isAddress(address)) {
    throw new Error(`Address ${address} is not a valid address`);
  }

  for (const criteria of gate.criteria) {
    const endBlock = await convertPeriodToBlockRange(criteria);
    const currentBlock = await provider.getBlockNumber();
    let fromBlock = currentBlock;
    let toBlock = Math.max(fromBlock - 10000, endBlock);
    while (toBlock >= endBlock) {
      const logs = await getLogs(
        criteria.event,
        gate.contractAddress,
        address,
        fromBlock,
        toBlock
      );
      // TODO filter and compare

      if (logs.length > 0) {
        return true;
      }
      fromBlock = toBlock - 1;
      toBlock = Math.max(fromBlock - 10000, endBlock);
    }
  }

  return true;
}

const dater = new EthDater(provider);

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

async function convertPeriodToBlockRange(criteria: Criteria): Promise<number> {
  const periodSeconds = getSecondsFromPeriod(criteria.period);
  const secondsRange = periodSeconds * criteria.evaluationPeriod;
  const startDate = subtractSeconds(new Date(), secondsRange);
  const blockResult = dater.getDate(startDate);
  return blockResult.block;
}
