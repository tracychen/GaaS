"use client";

import WalletConnectButton from "@/components/wallet/WalletConnectButton";
import { useWalletState } from "@/components/wallet/useWalletState";
import { Button } from "@/ui/Button";
import { Dropdown } from "@/ui/Dropdown";
import { PopoverButton } from "@/ui/QuestionPopover";
import { Text } from "@/ui/Text";
import CheckCircleSolidIcon from "@/ui/icons/CheckCircleSolidIcon";
import { Transition } from "@headlessui/react";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSignMessage } from "wagmi";

export const verifyWalletMessage = () => {
  return "GaaS";
};

const INTERACTIONS_ARRAY = [
  {
    index: 0,
    label: `Check for wallet contract interaction`,
    icon: ``,
  },
  {
    index: 1,
    label: `Check for wallet staking activity`,
    icon: ``,
  },
];

const Home = () => {
  const { isConnected, address, notConnected } = useWalletState();
  const {
    data: signature,
    signMessageAsync,
    isLoading,
    reset,
  } = useSignMessage();
  const [signatureValue, setSignatureValue] = useState();
  const [selectedGate, setSelectedGate] = useState(INTERACTIONS_ARRAY[0]);

  const showVerifyButton = useMemo(() => {
    return isConnected && !signature && !signatureValue;
  }, [isConnected, signature, signatureValue]);
  const isSignatureVerified = useMemo(() => {
    return isConnected && (!!signature || !!signatureValue);
  }, [isConnected, signature, signatureValue]);

  const onSignatureSuccess = (data: any) => {
    console.log(`signature success:${data}`);
    setSignatureValue(data);
  };
  const AddNewGate = () => {
    return (
      <>
        <div className={"rounded-brand bg-white p-8 sm:w-[500px]"}>
          <div className="mb-6 flex flex-col gap-y-4 justify-left">
            <Text variant={"regular"} weight={"bold"}>
              ⛩️ Add a new Gate
            </Text>
          </div>
          <div className="flex min-h-[48px] flex-wrap justify-left gap-5">
            <Text variant={"small"} weight={"bold"}>
              How would you like to gate your content?
            </Text>
            <Dropdown
              items={INTERACTIONS_ARRAY.map((i) => {
                return {
                  label: i.label,
                  icon: i.icon,
                  onClick: () => {
                    setSelectedGate(i);
                    toast(selectedGate.label);
                  },
                };
              })}
            >
              <div className="mt-[5px]">
                <PopoverButton
                  selectedItem={{ label: selectedGate.label }}
                  height={"64px"}
                />
              </div>
            </Dropdown>
          </div>
        </div>
      </>
    );
  };

  const WalletConnect = () => (
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
              onSignatureSuccess(response);
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

  const HomePage = () => {
    return (
      <div className={"rounded-brand bg-white p-8 sm:w-[500px]"}>
        <div className="mb-2 -mt-4 text-center text-[140px]">⛩️</div>
        <div className="mb-6 flex flex-col gap-y-4 text-center">
          <Text variant={"semibold"}>Add Gates</Text>
          <Text variant={"small"}>To manage who can access your content.</Text>
        </div>
        <WalletConnect />
        <div className="mt-6 mb-6 flex flex-col gap-y-4 text-center">
          <Text variant={"secondary"}>
            You will be asked to connect your wallet.
          </Text>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gradient-to-r from-deform-orange to-deform-red h-[2000px] bg-cover">
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="flex flex-wrap items-center justify-center">
              {!isSignatureVerified && <HomePage />}
              {isSignatureVerified && <AddNewGate />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
