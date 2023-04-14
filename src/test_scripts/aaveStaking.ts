import { getLogs } from "@/utils/quicknode-client";
import keccak256 from "keccak256";

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

  await getLogs(
    topic,
    contractAddress,
    walletAddress,
    fromBlock,
    toBlock,
  );
}

(async () => {
    getAaveStakingEvents("0x0000000000000000000000002079c29be9c8095042edb95f293b5b510203d6ce");
})();