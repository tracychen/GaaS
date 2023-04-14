import { BigNumber, providers, utils } from "ethers";
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


// function to get the logs of a wallet address and check if any of them are aave staking events
// aave staking event emitted looks like this: Staked (index_topic_1 address from, index_topic_2 address onBehalfOf, uint256 amount)
// example transaction: https://etherscan.io/tx/0x575527547e66cc034646595098afc520ff08f69da53a53d0b71787b28fe161c9
export const getAaveStakingEvents = async (walletAddress: string) => {
  // Aave staking contract
  const contractAddress = "0x4da27a545c0c5b758a6ba100e3a049001de870f5"; 
  const topic = "Staked(address,address,uint256)";
  const fromBlock = 17044018;
  const toBlock = 17044918;
  console.log(`topic: ${keccak256(topic).toString("hex")}`);

  const logs = await getLogs(
    topic,
    contractAddress,
    walletAddress,
    fromBlock,
    toBlock,
  );

  for (const log of logs) {
    console.log(`\n=== new log ===`);
    console.log(`amount staked: ${utils.formatEther(BigNumber.from(log.data).toString())} ETH`)
  }
}

(async () => {
    getAaveStakingEvents("0x0000000000000000000000002079c29be9c8095042edb95f293b5b510203d6ce");
})();