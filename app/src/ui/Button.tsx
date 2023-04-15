"use client";

import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { LoadingSpinner } from "./LoadingSpinner";
import { ButtonOrLink, ButtonOrLinkProps } from "./utils/ButtonOrLink";

export const opacityHover = "hover:opacity-80 transition-opacity";
const colorHover = "hover:bg-[#1a1a1a]/[0.05] transition-colors";

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center cursor-pointer whitespace-nowrap no-underline",
  ],
  {
    variants: {
      variant: {
        primary: `bg-black text-white ${opacityHover}`,
        secondary: `bg-white text-primary border border-primary ${colorHover}`,
        tertiary: `bg-white text-primary border border-tertiary ${colorHover}`,
        warning: `bg-red-600 text-white ${opacityHover}`,
        disabled: `bg-placeholder text-white ${opacityHover}`,
        brand: "bg-rainbow text-primary",
        discord: `bg-discord text-white ${opacityHover}`,
        twitter: `bg-twitter text-white ${opacityHover}`,
        telegram: `bg-telegram text-white ${opacityHover}`,
        /** No style for one-off custom buttons */
        custom: "",
      },
      size: {
        sm: "px-5 py-2.5 rounded-brand text-body font-normal",
        md: "px-5 py-2.5 rounded-brand text-body font-semibold",
        lg: "px-4 py-3 rounded-lg text-lg font-semibold",
        /** Full width buttons for mobile size modals */
        modal:
          "px-5 py-2.5 rounded-brand text-body font-semibold w-full sm:w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    ButtonOrLinkProps {
  icon?:
    | "circleArrow"
    | "check-circle"
    | "wallet"
    | "download"
    | "refresh"
    | "";
  isLoading?: boolean;
  loadingLocation?: "left" | "right";
}

export function Button({
  variant,
  size,
  icon,
  isLoading,
  loadingLocation = "left",
  ...props
}: ButtonProps) {
  if (variant === "custom") {
    return <ButtonOrLink {...props}>{props.children}</ButtonOrLink>;
  }

  /**
   * For the brand variant, the border is actually a background, so we need to
   * recalculate the padding to account for the border:
   *
   * actual padding(rem) = desired padding - border size
   */
  const brandBorderSize = `!p-[0.125rem]`; // 2px;
  const brandPaddingX = "px-[1.125rem]";
  const brandPaddingY = `py-[0.5rem]`;

  const baseStyle = clsx(
    (props.disabled || isLoading) && "pointer-events-none opacity-60"
  );

  return variant !== "brand" ? (
    <ButtonOrLink
      className={clsx(
        buttonStyles({ variant, size }),
        baseStyle,
        props.className
      )}
      {...props}
    >
      <div className="flex items-center">
        {loadingLocation === "left" && isLoading && (
          <div className="mr-2.5">
            <LoadingSpinner />
          </div>
        )}
        {icon === "wallet" && (
          <span className="mr-2.5">
            <img
              src="/icons/wallet.svg"
              height={20}
              width={20}
              alt="wallet icon"
            />
          </span>
        )}
        {!isLoading && icon === "download" && (
          <span className="mr-2.5">
            <img
              src="/icons/download.svg"
              height={20}
              width={20}
              alt="download"
            />
          </span>
        )}
        {!isLoading && icon === "check-circle" && (
          <span className="mr-2.5">
            <img
              src="/icons/download.svg"
              height={20}
              width={20}
              alt="download"
            />
          </span>
        )}
        {!isLoading && icon === "refresh" && (
          <span className="mr-2.5">
            <img
              src="/icons/refresh.svg"
              height={20}
              width={20}
              alt="refresh"
            />
          </span>
        )}
        {props.children}
        {!isLoading && icon === "circleArrow" && (
          <span className="ml-2.5">
            <img
              src="/icons/circle-arrow-left.svg"
              height={20}
              width={20}
              alt="circle with left arrow"
            />
          </span>
        )}
        {loadingLocation === "right" && isLoading && (
          <div className="ml-2.5">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </ButtonOrLink>
  ) : (
    <ButtonOrLink
      className={clsx(
        buttonStyles({ variant, size }),
        brandBorderSize,
        baseStyle
      )}
      {...props}
    >
      <span
        className={clsx(
          "rounded-lg bg-white text-black",
          brandPaddingX,
          brandPaddingY
        )}
      >
        {props.children}
      </span>
    </ButtonOrLink>
  );
}
