import { Heading } from "@/ui/Heading";
import RequirementState from "../RequirementState";

const calculateRequirementVariant = (
  evaluatorOutput?: boolean,
  loading?: boolean
) => {
  if (loading) {
    return "loading";
  }
  if (evaluatorOutput === undefined) {
    return "notConnected";
  }
  if (evaluatorOutput) {
    return "satisfied";
  }
  return "unsatisfied";
};

export default function WalletAccessRequirement({
  gateInfo,
  evaluatorOutput,
  loading,
}: {
  gateInfo: any;
  evaluatorOutput?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <Heading variant={"heading3"} color={"primary"}>
        {gateInfo.gateName}
      </Heading>
      <div className="max-w-fit">
        <RequirementState
          variant={calculateRequirementVariant(evaluatorOutput, loading)}
        />
      </div>
    </div>
  );
}
