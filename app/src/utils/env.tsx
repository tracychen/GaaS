interface ChainConfig {
  chainID: number;
  rpcURL: string;
  /**
   * Private key for the account that will be used to send transactions.
   * This is only required for chains we have deployed our storage contract on.
   */
  privateKey?: string;
}
export const CHAIN_CONFIGS: { [key: string]: ChainConfig } = {
  mainnet: {
    // The Ethereum main net
    chainID: 1,
    rpcURL: process?.env?.MAINNET_NETWORK_RPC_URL!, // eslint-disable-line
  },
  polygon: {
    // The Polygon main net
    chainID: 137,
    rpcURL: process?.env?.POLYGON_NETWORK_RPC_URL!, // eslint-disable-line
  },
  scrollalpha: {
    // Scroll alpha test net
    chainID: 534353,
    rpcURL: process?.env?.SCROLL_ALPHA_NETWORK_RPC_URL!, // eslint-disable-line
    privateKey: process?.env?.PRIVATE_KEY!, // eslint-disable-line
  },
  goerli: {
    // The Goerli test net
    chainID: 5,
    rpcURL: process?.env?.GOERLI_NETWORK_RPC_URL!, // eslint-disable-line
  },
  mumbai: {
    // The Polygon Mumbai test net
    chainID: 80001,
    rpcURL: process?.env?.MUMBAI_NETWORK_RPC_URL!, // eslint-disable-line
    privateKey: process?.env?.PRIVATE_KEY!, // eslint-disable-line
  },
  hardhat: {
    // Development (using hardhat - npx hardhat node)
    chainID: 1337,
    rpcURL: "http://127.0.0.1:8545",
    privateKey: process?.env?.PRIVATE_KEY!, // eslint-disable-line
  },
};
