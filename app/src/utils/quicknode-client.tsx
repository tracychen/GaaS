import { BigNumber } from "ethers";
import { getJsonRpcProvider } from "./provider";

const provider = getJsonRpcProvider("mainnet");

export const getWalletTokenTransactions = async (
  address: string,
  contract: string,
  page = 1,
  perPage = 10
) => {
  console.log(provider);
  const heads = await provider.send("qn_getWalletTokenTransactions", [
    {
      address,
      contract,
      page,
      perPage,
    },
  ]);
  console.log(heads);
  return heads;
};

export const getLogs = async (
  topics: string[], // only supports one topic for now
  contractAddress: string,
  fromBlock: number, // i.e. 123456
  toBlock: number // i.e. 123456
) => {
  const params = {
    address: contractAddress,
    fromBlock: BigNumber.from(fromBlock).toHexString() || "latest",
    toBlock: BigNumber.from(toBlock).toHexString() || "latest",
    topics,
  };
  console.log("getting logs..", params);
  const logs = await provider.getLogs(params);
  return logs;
};
