import { verifyWalletMessage } from "@/app/page";
import WalletConnectButton from "@/components/wallet/WalletConnectButton";
import { useWalletState } from "@/components/wallet/useWalletState";
import { Button } from "@/ui/Button";
import CheckCircleSolidIcon from "@/ui/icons/CheckCircleSolidIcon";
import { Transition } from "@headlessui/react";
import { useEffect, useMemo } from "react";
import { useSignMessage } from "wagmi";

const WalletConnectAndVerify = ({
  gateId,
  signatureValue,
  onSignatureSuccess,
  onWalletDisconnected,
}: {
  gateId: string;
  signatureValue?: string;
  onSignatureSuccess?: (address: string, signature: string) => void;
  onWalletDisconnected?: () => void;
}) => {
  const { isConnected, address, notConnected } = useWalletState();
  const {
    data: signature,
    signMessageAsync,
    isLoading,
    reset,
  } = useSignMessage();

  const showVerifyButton = useMemo(() => {
    return isConnected && !signature && !signatureValue;
  }, [isConnected, signature, signatureValue]);
  const isSignatureVerified = useMemo(() => {
    return isConnected && (!!signature || !!signatureValue);
  }, [isConnected, signature, signatureValue]);

  useEffect(() => {
    if (notConnected) {
      reset();
      if (onWalletDisconnected) {
        onWalletDisconnected();
      }
    }
  }, [isConnected, address, notConnected]);

  return (
    <div className="flex min-h-[48px] flex-wrap items-center gap-5">
      <WalletConnectButton />
      <Transition
        show={showVerifyButton}
        enter="transform transition duration-[100ms] ease-out"
        enterFrom="opacity-0 -translate-x-full scale-0"
        enterTo="opacity-100 translate-x-0 scale-100"
        leave=""
        leaveTo="opacity-0"
        leaveFrom="opacity-100"
        className={""}
      >
        <Button
          onClick={async () => {
            if (address) {
              const response = await signMessageAsync({
                message: verifyWalletMessage(),
              });
              if (onSignatureSuccess) {
                onSignatureSuccess(address, response);
              }
            }
          }}
          isLoading={isLoading}
          icon={signature ? "checkCircle" : ""}
          disabled={!!signature}
          variant="secondary"
        >
          Sign to verify {isLoading ? "" : <span className="ml-2">🖋</span>}
        </Button>
      </Transition>

      <Transition
        show={isSignatureVerified}
        enter="transform transition duration-[100ms] ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave=""
        leaveTo="opacity-0"
        leaveFrom="opacity-100"
      >
        <div className="flex items-center gap-x-2 !text-[#34653B]">
          <span>
            <CheckCircleSolidIcon />
          </span>
          <p>Your wallet is verified</p>
        </div>
      </Transition>
    </div>
  );
};

export default WalletConnectAndVerify;
