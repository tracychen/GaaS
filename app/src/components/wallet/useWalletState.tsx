import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

type UseWalletStateType = {
  isConnected: boolean;
  notConnected: boolean;
  connecting: boolean;
  pendingConnection: boolean;
  reconnecting: boolean;
  address: `0x${string}` | undefined;
};

/**
 * Wrapper for wagmi's useAccount hook. If we want to swap out wagmi for something
 * else in the future, we can do it here without changing the app code.
 */
export const useWalletState = (): UseWalletStateType => {
  // Captures any weird disconnected state that wagmi might not handle
  const [initialDc, setInitialDc] = useState(true);

  const { address, isConnecting, isReconnecting, isConnected } = useAccount();

  // Trying to see if wallet is connected
  const connecting =
    Boolean(isConnecting && !isReconnecting && !address) || initialDc;

  // No wallet connected
  const notConnected = Boolean(!isConnecting && !isReconnecting && !address);

  // Pending wallet confirmation
  const pendingConnection = Boolean(
    isConnecting && !isReconnecting && !address
  );

  // We are reconnecting
  const reconnecting = Boolean(isReconnecting && address);

  useEffect(() => {
    if (initialDc && connecting) {
      setInitialDc(false);
    }
  }, [connecting, initialDc]);

  return {
    isConnected,
    notConnected,
    connecting,
    pendingConnection,
    reconnecting,
    address,
  };
};
