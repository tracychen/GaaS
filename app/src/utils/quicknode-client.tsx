import { BigNumber, providers } from "ethers";

export const getLogs = async (
  topics: string[], // only supports one topic for now
  contractAddress: string,
  fromBlock: number, // i.e. 123456
  toBlock: number, // i.e. 123456
  provider: providers.JsonRpcProvider
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
