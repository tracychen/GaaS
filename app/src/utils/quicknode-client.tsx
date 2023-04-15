import { BigNumber, providers } from "ethers";
import keccak256 from "keccak256";
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
  topic: string, // only supports one topic for now
  contractAddress: string,
  walletAddress: string,
  fromBlock: number, // i.e. 123456
  toBlock: number // i.e. 123456
) => {
  console.log("getting logs..");
  const topicHex = keccak256(topic).toString("hex");
  const logs = await provider.getLogs({
    address: contractAddress,
    fromBlock: BigNumber.from(fromBlock).toHexString() || "latest",
    toBlock: BigNumber.from(toBlock).toHexString() || "latest",
    topics: [`0x${topicHex}`, walletAddress],
  });
  return logs;
};
