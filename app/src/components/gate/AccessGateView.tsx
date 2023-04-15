import axios from "axios";

import { Button } from "@/ui/Button";
import { Heading } from "@/ui/Heading";
import { Text } from "@/ui/Text";
import { useEffect, useState } from "react";
import WalletAccessGate from "./wallet/WalletAccessGate";

export default function AccessGateView({
  gateId,
  onGoToNext,
}: {
  gateId: string;
  onGoToNext: () => void;
}) {
  // obtain tag info from backend using gateId
  const [requirement, setRequirement] = useState<any>({});
  const [requirementLoading, setRequirementLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getRequirements() {
      setRequirementLoading(true);
      const { data } = await axios.get(`/api/gate/${gateId}`);
      setRequirement(data.data);
      setRequirementLoading(false);
    }
    getRequirements();
  }, []);

  // update go next button state
  const [evaluationResult, setEvaluationResult] = useState(false);

  return (
    <div className="flex max-w-[750px] flex-col gap-y-4 rounded-xl bg-white py-10 px-5 sm:px-10">
      <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <Heading variant={"heading3"} weight={"semibold"} color={"primary"}>
            Please verify your identity.
          </Heading>
          <div className="sm:w-[500px]">
            <Heading variant={"heading4"} color={"tertiary"}>
              To view this form, you must satisfy{" "}
              <div className="inline-block">
                <Text weight={"bold"}>ALL</Text>
              </div>{" "}
              of the requirements below.
            </Heading>
          </div>
        </div>
        <div>
          <Button
            icon={"circleArrow"}
            onClick={onGoToNext}
            disabled={!evaluationResult}
          >
            View content
          </Button>
        </div>
      </div>
      <WalletAccessGate
        gateId={gateId}
        requirement={requirement}
        requirementLoading={requirementLoading}
        evaluationResult={evaluationResult}
        setEvaluationResult={setEvaluationResult}
      />
    </div>
  );
}
