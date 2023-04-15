import { Signer, Wallet, providers } from "ethers";
import { CHAIN_CONFIGS } from "./env";
import { GaaS__factory } from "@gaas/protocol";
import contractAddresses from "@gaas/protocol/contractAddresses.json";

export const verifyWalletMessage = (address: string) => {
  return `Welcome to GaaS ⛩️!

Sign this message to verify ownership of your wallet address.

This request will not trigger a blockchain transaction or cost any gas fees.

Your address: <WALLET_ADDRESS>
  `.replace("<WALLET_ADDRESS>", address);
};

export function getJsonRpcSigner(chain: string): Signer {
  const customHttpProvider = getJsonRpcProvider(chain);
  return new Wallet(CHAIN_CONFIGS[chain].privateKey!, customHttpProvider);
}

export function getJsonRpcProvider(chain: string): providers.JsonRpcProvider {
  if (!chain || !(chain in CHAIN_CONFIGS)) {
    throw new Error(`Chain invalid, options: ${Object.keys(CHAIN_CONFIGS)}`);
  }
  return new providers.JsonRpcProvider(CHAIN_CONFIGS[chain].rpcURL);
}

export function getGaaSContract(chain: string) {
  const signer = getJsonRpcSigner(chain);
  return GaaS__factory.connect((contractAddresses as any)[chain], signer);
}
