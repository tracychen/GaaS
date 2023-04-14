import { BigNumber, providers } from "ethers";
import keccak256 from "keccak256";

const provider = new providers.JsonRpcProvider(
  "https://fragrant-maximum-morning.discover.quiknode.pro/d0622d4d9d620911c27303a0b6f5e3dbee0a41c5/"
);

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
  toBlock: number,  // i.e. 123456
) => {
  const topicHex = keccak256(topic).toString("hex");
  const logs = await provider.getLogs({
    address: contractAddress,
    fromBlock: BigNumber.from(fromBlock).toHexString() || "latest",
    toBlock: BigNumber.from(toBlock).toHexString() || "latest",
    topics: [`0x${topicHex}`, walletAddress],
  });
  console.log(logs);
  return logs;
};
