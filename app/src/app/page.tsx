"use client";

import WalletConnectButton from "@/components/wallet/WalletConnectButton";
import { useWalletState } from "@/components/wallet/useWalletState";
import { periods } from "@/types/gate";
import { Button } from "@/ui/Button";
import { Dropdown } from "@/ui/Dropdown";
import { Input } from "@/ui/Input";
import { PopoverButton } from "@/ui/QuestionPopover";
import { Text } from "@/ui/Text";
import { ArbitrumIcon } from "@/ui/icons/ArbitrumIcon";
import CheckCircleSolidIcon from "@/ui/icons/CheckCircleSolidIcon";
import { EthereumIcon } from "@/ui/icons/EthereumIcon";
import { OptimismIcon } from "@/ui/icons/OptimismIcon";
import { PolygonIcon } from "@/ui/icons/PolygonIcon";
import { parseEvents } from "@/utils/events/abiParser";
import { Transition } from "@headlessui/react";
import { useMemo, useState } from "react";
import { useSignMessage } from "wagmi";

export const verifyWalletMessage = () => {
  return "GaaS";
};
export enum GATE_TYPE {
  INTERACTION = "EVENTS_EMITTED",
  STAKING = "READ_CONTRACT_INFO",
}

const INTERACTIONS_ARRAY = [
  {
    type: GATE_TYPE.INTERACTION,
    label: `Check for wallet contract interaction`,
    icon: ``,
  },
  {
    type: GATE_TYPE.STAKING,
    label: `Check for wallet staking activity`,
    icon: ``,
  },
];

const NETWORK_ARRAY = [
  {
    network: "eth-mainnet",
    chainId: 1,
    label: "Ethereum Mainnet",
    icon: <EthereumIcon />,
  },
  {
    network: "eth-goerli",
    chainId: 5,
    label: "Ethereum Goerli",
    icon: <EthereumIcon />,
  },
  {
    network: "opt-mainnet",
    chainId: 10,
    label: "Optimism",
    icon: <OptimismIcon />,
  },
  {
    network: "opt-goerli",
    chainId: 420,
    label: "Optimism Goerli",
    icon: <OptimismIcon />,
  },
  {
    network: "arb-mainnet",
    chainId: 42161,
    label: "Arbitrum",
    icon: <ArbitrumIcon />,
  },
  {
    network: "arb-goerli",
    chainId: 421613,
    label: "Arbitrum Goerli",
    icon: <ArbitrumIcon />,
  },
  {
    network: "polygon-mainnet",
    chainId: 137,
    label: "Polygon",
    icon: <PolygonIcon />,
  },
  {
    network: "polygon-mumbai",
    chainId: 80001,
    label: "Polygon Mumbai",
    icon: <PolygonIcon />,
  },
];

export interface Event {
  name: string;
  field: string;
  type: "event" | "function";
  index: number;
  icon?: JSX.Element;
}
// data
// {
//   "data": {
//       "gateType": "EVENTS_EMITTED",
//       "contractAddress": "0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9",
//       "chainId": 1,
//       "gateConfiguration": {
//           "evaluationPeriod": 5,           // evaluationPeriod
//           "period": "hour",                // selectedPeriod
//           "event": "Deposit",              // selectedEvent.name
//           "addressArgument": {
//               "argumentName": "user",      // selectedEvent.field
//               "indexed": 0                 // selectedEvent.index
//           },
//           "requiredCount": 1               // requiredCount
//       }
//   }
// }

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
  const [selectedChain, setSelectedChain] = useState(NETWORK_ARRAY[0]);
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [evaluationPeriod, setEvaluationPeriod] = useState(1);
  const [requiredCount, setRequiredCount] = useState(1);
  const [contractAddress, setContractAddress] = useState("");
  const [contractABI, setContractABI] = useState("");
  const [eventOptions, setEventOptions] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [gateName, setGateName] = useState("");

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
        <div className={"rounded-brand bg-white p-8 sm:w-[868px]"}>
          <div className="mb-6 flex flex-col gap-y-4 justify-left">
            <Text variant={"regular"} weight={"bold"}>
              ⛩️ Add a new gate
            </Text>
          </div>
          <div className="flex min-h-[48px] flex-wrap justify-left flex-col gap-5">
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

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          {selectedGate.type === GATE_TYPE.INTERACTION && (
            <>
              <div>
                <Text variant={"regular"} weight={"bold"}>
                  Contract interaction configuration
                </Text>
                <div className="mt-[10px]">
                  <Text variant={"small"} color={"tertiary"}>
                    Please specify details of the required contract interaction.
                  </Text>
                </div>
                <div className="pt-[10px] pb-[10px]">
                  <Text variant={"small"}>Contract chain</Text>
                  <Dropdown
                    items={NETWORK_ARRAY.map((i) => {
                      return {
                        label: i.label,
                        icon: i.icon,
                        onClick: () => {
                          setSelectedChain(i);
                        },
                      };
                    })}
                  >
                    <div className="mt-[5px]">
                      <PopoverButton
                        selectedItem={{
                          label: selectedChain.label,
                          icon: selectedChain.icon,
                        }}
                        height={"64px"}
                      />
                    </div>
                  </Dropdown>
                </div>
              </div>
              <div className="pt-[10px] pb-[10px]">
                <Text variant={"small"}>Contract address</Text>
                <Input
                  className={
                    "h-16 rounded-lg border border-tertiary/20 px-5 text-small placeholder:text-placeholder focus:border-primary focus:outline-none w-full mt-[5px]"
                  }
                  placeholder={"Paste contract address"}
                  type={"text"}
                  onChange={(e) => setContractAddress(e.target.value)}
                  value={contractAddress}
                />
              </div>
              <div className="pt-[10px] pb-[10px]">
                <div className="pt-[10px]">
                  <Text variant={"small"}>
                    Upload Application Binary Interface (ABI)
                  </Text>
                </div>
                <div className="pt-[10px] pb-[10px]">
                  <Text variant={"small"} color={"tertiary"}>
                    To check for custom functions and events
                  </Text>
                </div>
                <Input
                  className={
                    "h-16 rounded-lg border border-tertiary/20 px-5 text-small placeholder:text-placeholder focus:border-primary focus:outline-none w-full mt-[5px]"
                  }
                  placeholder={"Paste contract ABI"}
                  type={"text"}
                  onChange={(e) => {
                    setContractABI(e.target.value);
                    console.log("ABI: ", e.target.value);
                    const parsed = parseEvents(e.target.value);
                    console.log(parsed);
                    setEventOptions(parsed);
                  }}
                  value={contractABI}
                />
              </div>
              <div className="pt-[10px] pb-[10px]">
                <Text variant={"small"}>Interactions to check for</Text>
                <Dropdown
                  items={eventOptions.map((eventOption) => {
                    return {
                      label: `${eventOption.type}: ${eventOption.name} -> ${eventOption.field} (topic index: ${eventOption.index})`,
                      icon: eventOption.icon,
                      onClick: () => {
                        setSelectedEvent(eventOption);
                      },
                    };
                  })}
                >
                  <div className="mt-[5px]">
                    <PopoverButton
                      selectedItem={{
                        label: selectedEvent
                          ? selectedEvent!.name + " " + selectedEvent!.field
                          : "Select Event Option",
                      }}
                      height={"64px"}
                    />
                  </div>
                </Dropdown>
              </div>
              <div className="flex items-center">
                <div className="pr-2">
                  <Text variant={"small"}>
                    Require users to have interacted at least
                  </Text>
                </div>
                <Input
                  min={0}
                  type={"number"}
                  placeholder="1"
                  defaultValue={requiredCount}
                  onChange={(e) => setRequiredCount(parseInt(e.target.value))}
                />
                <div className="px-2">
                  <Text variant={"small"}>time(s) in the past</Text>
                </div>
                <div className="pr-2">
                  <Input
                    min={0}
                    type={"number"}
                    placeholder="1"
                    defaultValue={evaluationPeriod}
                    onChange={(e) =>
                      setEvaluationPeriod(parseInt(e.target.value))
                    }
                  />
                </div>
                <Dropdown
                  items={periods.map((period) => {
                    return {
                      label: `${period}s`,
                      onClick: () => {
                        setSelectedPeriod(period);
                      },
                    };
                  })}
                >
                  <div className="mt-[5px]">
                    <PopoverButton
                      selectedItem={{
                        label: `${selectedPeriod}s`,
                      }}
                      height={"40px"}
                    />
                  </div>
                </Dropdown>
              </div>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <div className="pt-[10px] pb-[10px]">
                <Text variant={"regular"} weight={"bold"}>
                  Name your Gate
                </Text>
                <div className="mt-[10px]">
                  <Text variant={"small"} color={"tertiary"}>
                    Gate name
                  </Text>
                </div>
                <Input
                  className={
                    "h-16 rounded-lg border border-tertiary/20 px-5 text-small placeholder:text-placeholder focus:border-primary focus:outline-none w-full mt-[5px]"
                  }
                  placeholder={"e.g. ApeCoin Staker"}
                  type={"text"}
                  onChange={(e) => setGateName(e.target.value)}
                  value={gateName}
                />
              </div>
              <div className="flex justify-end mt-[12px] mb-[12px]">
                <Button
                  isLoading={false}
                  onClick={() => {
                    console.log("hi");
                  }}
                >
                  Confirm
                </Button>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  const WalletConnect = () => (
    <div className="flex min-h-[48px] flex-wrap items-center justify-center gap-5">
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
          icon={signature ? "check-circle" : ""}
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
