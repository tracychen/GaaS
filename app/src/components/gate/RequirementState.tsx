import { Heading } from "@/ui/Heading";
import CheckCircleSolidIcon from "@/ui/icons/CheckCircleSolidIcon";
import SolidCircleIcon from "@/ui/icons/SolidCircleIcon";
import XCircleIcon from "@/ui/icons/XCircleIcon";
import { LoadingSpinner } from "@/ui/LoadingSpinner";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const styles = cva([], {
  variants: {
    variant: {
      notConnected: "text-body text-tertiary bg-tertiary/25",
      loading: "text-body text-[#95B9FF] bg-[#95B9FF]/25",
      satisfied: "text-body text-[#3EAF3F] bg-[#3EAF3F]/25",
      unsatisfied: "text-body text-error bg-error/25",
    },
  },
  defaultVariants: {
    variant: "satisfied",
  },
});

export interface RequirementStateProps extends VariantProps<typeof styles> {}

export default function RequirementState({
  ...styleProps
}: RequirementStateProps) {
  const getText = (
    variant: "notConnected" | "loading" | "satisfied" | "unsatisfied"
  ) => {
    switch (variant) {
      case "notConnected":
        return "Connect wallet to check eligibility";
      case "loading":
        return "Checking eligibility...";
      case "satisfied":
        return "You meet this requirement";
      case "unsatisfied":
        return "You do not meet this requirement";
      default:
        return "You do not meet this requirement";
    }
  };
  return !styleProps.variant ? (
    <></>
  ) : (
    <div
      className={clsx(
        "flex place-items-center gap-x-[10px] rounded-lg py-[6px] px-2",
        styles(styleProps)
      )}
    >
      {styleProps.variant === "satisfied" && (
        <CheckCircleSolidIcon color="#3EAF3F" width={16} height={16} />
      )}
      {styleProps.variant === "unsatisfied" && (
        <XCircleIcon color="#EB5757" width={16} height={16} />
      )}
      {styleProps.variant === "notConnected" && (
        <SolidCircleIcon color="#98A2B6" width={16} height={16} />
      )}
      {styleProps.variant === "loading" && (
        <LoadingSpinner className="h-4 w-4" bgColor="#95B9FF" />
      )}

      <Heading variant={"heading4"}>{getText(styleProps.variant)}</Heading>
    </div>
  );
}
