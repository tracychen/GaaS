import axios from "axios";

import { Heading } from "@/ui/Heading";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import WalletAccessRequirement from "./WalletAccessRequirement";
import WalletConnectAndVerify from "./WalletConnectAndVerify";
import { Shimmer } from "@/ui/Shimmer";

export default function WalletAccessGate({
  gateId,
  requirement,
  requirementLoading,
  evaluationResult,
  setEvaluationResult,
}: {
  gateId: string;
  requirement: any;
  requirementLoading: boolean;
  evaluationResult: boolean;
  setEvaluationResult: Dispatch<SetStateAction<boolean>>;
}) {
  const [evaluationLoading, setEvaluationLoading] = useState(false);
  const evaluateActionTags = async (address: string, signature: string) => {
    try {
      setEvaluationLoading(true);
      const {
        data: { result: res },
      } = await axios.post(`/api/evaluation`, {
        gateId: gateId,
        address: address,
      });
      if (res === true) {
        setEvaluationResult(true);
      }
      setEvaluationLoading(false);
    } catch (err) {
      toast.error("Gate evaluation failed. Try again.");
      console.error(err);
      setEvaluationLoading(false);
    }
  };

  // wallet state & logic
  const [walletInfo, setWalletInfo] = useState<
    { address: string; signature: string } | undefined
  >();
  const storeWalletInfo = (address: string, signature: string) => {
    setWalletInfo({ address, signature });
    localStorage.setItem(
      `gate-${gateId}-wallet-info`,
      JSON.stringify({ address, signature })
    );
  };
  const disconnectWallet = () => {
    setWalletInfo(undefined);
    localStorage.removeItem(`gate-${gateId}-wallet-info`);

    setEvaluationResult(false);
  };

  return (
    <div className="rounded-xl border-[1px] border-placeholder bg-white py-5 px-10">
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <Heading variant={"heading3"} weight={"semibold"} color={"primary"}>
            Please connect your wallet.
          </Heading>
          <WalletConnectAndVerify
            gateId={gateId}
            signatureValue={walletInfo?.signature}
            onSignatureSuccess={async (address: string, signature: string) => {
              try {
                storeWalletInfo(address, signature);
                evaluateActionTags(address, signature);
              } catch (err: any) {
                console.error(err);
                toast.error(err);
              }
            }}
            onWalletDisconnected={disconnectWallet}
          />
        </div>
        <hr />

        {requirementLoading && (
          <div className="flex flex-col gap-y-6">
            <div className="rounded-xl">
              <Shimmer width="100%" height={90} />
            </div>
          </div>
        )}
        {!requirementLoading && (
          <WalletAccessRequirement
            gateInfo={requirement}
            evaluatorOutput={
              walletInfo === undefined ? undefined : evaluationResult
            }
            loading={evaluationLoading}
          />
        )}
      </div>
    </div>
  );
}
