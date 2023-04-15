import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";

const headingStyles = cva([], {
  variants: {
    variant: {
      heading1: "text-heading2 font-bold md:text-heading1",
      heading2: "text-regular md:text-heading2 font-bold",
      heading3: "text-regular md:text-heading3 text-secondary font-normal",
      heading4: "text-heading4 font-normal",
    },
    /** Disables responsive sizing of the heading. */
    fixed: { true: "", false: "" },
    /** Overrides default font color. */
    color: {
      primary: "!text-primary",
      secondary: "!text-secondary",
      tertiary: "!text-tertiary",
    },
    /** Overrides default font weight. */
    weight: {
      bold: "!font-bold",
      semibold: "!font-semibold",
      medium: "!font-medium",
      normal: "!font-normal",
    },
  },
  compoundVariants: [
    { fixed: true, variant: "heading1", class: "!text-heading1" },
    { fixed: true, variant: "heading2", class: "!text-heading2" },
    { fixed: true, variant: "heading3", class: "!text-heading3" },
    { fixed: true, variant: "heading4", class: "!text-heading4" },
  ],
  defaultVariants: {
    variant: "heading1",
    fixed: false,
  },
});

export interface HeadingProps extends VariantProps<typeof headingStyles> {
  as?: "h1" | "h2" | "h3" | "h4" | "div";
  children: ReactNode;
}

export function Heading({
  as: Tag = "div",
  children,
  ...styleProps
}: HeadingProps) {
  return (
    <Tag
      /** Tailwind's break-words is not effective so we manually style here */
      style={{ wordBreak: "break-word" }}
      className={headingStyles(styleProps)}
    >
      {children}
    </Tag>
  );
}
