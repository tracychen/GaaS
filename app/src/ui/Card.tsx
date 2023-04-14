import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { type ReactNode } from "react";

const cardStyles = cva(
  "bg-white rounded-brand border-solid border-2 border-border",
  {
    variants: {
      spacing: {
        sm: "px-5 py-4 rounded-lg",
        md: "p-5 rounded-xl",
        lg: "p-8 rounded-xl",
      },
      shadow: {
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
    },
    defaultVariants: {
      spacing: "sm",
    },
  },
);

export interface CardProps extends VariantProps<typeof cardStyles> {
  children?: ReactNode;
  className?: string;
}

export function Card({ spacing, shadow, className, children }: CardProps) {
  return (
    <div className={clsx(cardStyles({ spacing, shadow }), className)}>
      {children}
    </div>
  );
}
