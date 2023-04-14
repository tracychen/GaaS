import Link from "next/link";
import { forwardRef, type ComponentProps } from "react";

export interface ButtonOrLinkProps
  extends Omit<
    Partial<typeof Link> & ComponentProps<"a"> & ComponentProps<"button">,
    "ref"
  > {
  externalHref?: string; // Use for external links, href for internal routes
}

export const ButtonOrLink = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonOrLinkProps
>(({ href, externalHref, ...props }, ref: any) => {
  if (externalHref) {
    return (
      <a
        ref={ref}
        target="_blank"
        rel="noreferrer noopener"
        href={externalHref}
        {...props}
      />
    );
  }

  if (href) {
    return (
      <Link href={href} ref={ref}>
        <div className={props.className}>{props.children}</div>
      </Link>
    );
  }

  return <button {...props} type={props.type || "button"} ref={ref} />;
});
