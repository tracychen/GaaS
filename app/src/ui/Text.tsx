import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";

const colorTypes = [
  "primary",
  "secondary",
  "tertiary",
  "placeholder",
  "error",
] as const;
export type ColorType = typeof colorTypes[number];

const textStyles = cva([], {
  variants: {
    variant: {
      bold: "text-body text-primary font-bold",
      semibold: "text-body text-primary font-semibold",
      large: "text-lg text-primary",
      regular: "text-body text-primary",
      small: "text-small text-primary",
      xsmall: "text-xsmall text-primary",
      secondary: "text-small text-secondary",
      placeholder: "text-small text-placeholder",
      error: "text-small text-error",
    },
    /**
     * Overrides default font color.
     * Note: we hardcoded these options without doing runtime generaiton of these
     * types based on the ColorType type, because we think tailwind is trying to only
     * load CSS that it cares about, and any runtime generation of types cause the CSS
     * to not be applied.
     */
    color: {
      primary: "!text-primary",
      secondary: "!text-secondary",
      tertiary: "!text-tertiary",
      placeholder: "!text-placeholder",
      error: "!text-error",
    },
    /** Overrides default font weight. */
    weight: {
      bold: "!font-bold",
      semibold: "!font-semibold",
      medium: "!font-medium",
      normal: "!font-normal",
    },
  },
  defaultVariants: {
    variant: "regular",
  },
});

export interface TextProps extends VariantProps<typeof textStyles> {
  as?: "p" | "div";
  children: ReactNode;
}

export function Text({ as: Tag = "div", children, ...styleProps }: TextProps) {
  return (
    <Tag style={{ wordBreak: "break-word" }} className={textStyles(styleProps)}>
      {children}
    </Tag>
  );
}
