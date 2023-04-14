import * as dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/config";
import { NetworksUserConfig } from "hardhat/types";

import "./tasks";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // https://hardhat.org/metamask-issue.html
    hardhat: {
      chainId: 1337,
    },
  },
  // etherscan: {},
};

const {
  MUMBAI_NETWORK_RPC_URL,
  MUMBAI_PRIVATE_KEY,
  SCROLL_ALPHA_NETWORK_RPC_URL,
  SCROLL_ALPHA_PRIVATE_KEY,
} = process.env;

if (MUMBAI_NETWORK_RPC_URL && MUMBAI_PRIVATE_KEY) {
  (config.networks as NetworksUserConfig).mumbai = {
    chainId: 80001,
    url: MUMBAI_NETWORK_RPC_URL,
    accounts: [MUMBAI_PRIVATE_KEY],
  };
}

if (SCROLL_ALPHA_NETWORK_RPC_URL && SCROLL_ALPHA_PRIVATE_KEY) {
  (config.networks as NetworksUserConfig).scrollalpha = {
    chainId: 534353,
    url: SCROLL_ALPHA_NETWORK_RPC_URL,
    accounts: [SCROLL_ALPHA_PRIVATE_KEY],
  };
}

export default config;
