import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import type { ReactNode } from "react";
import React, { useState } from "react";
import { Popover } from "react-tiny-popover";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";

const textOverflowStyle = "text-ellipsis whitespace-nowrap overflow-hidden";
const iconStyle = "!h-5 !w-5 mr-2 flex items-center justify-center";

export interface PopoverItemProps {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  showHover?: boolean;
  hideMobileStyle?: boolean;
}

export const PopoverItem = ({
  label,
  icon,
  onClick,
  showHover,
  hideMobileStyle,
}: PopoverItemProps) => {
  return (
    <>
      <button
        data-testid={`[${label}]-button`}
        type="button"
        className={clsx(
          textOverflowStyle,
          "flex h-[60px] w-full items-center justify-center rounded-brand border border-solid p-1 transition-colors duration-75 sm:h-[40px] sm:justify-start sm:border-none",
          showHover && "hover:bg-tertiary/10",
          hideMobileStyle && "!h-[40px] !justify-start !border-none"
        )}
        onClick={onClick}
      >
        {icon && <figure className={iconStyle}>{icon}</figure>}
        <div className={clsx(textOverflowStyle, "inline-flex items-center")}>
          <div
            className={clsx(
              "text-heading3 text-primary sm:text-small",
              hideMobileStyle && "!text-small"
            )}
          >
            {label}
          </div>
        </div>
      </button>
    </>
  );
};

export interface PopoverSectionProps {
  sectionLabel?: string;
  sectionItems: PopoverItemProps[];
}
const PopoverSection = ({
  sectionLabel,
  sectionItems,
  closePopover,
}: PopoverSectionProps & { closePopover?: () => void }) => {
  return (
    <>
      <div className="flex w-full flex-col items-start justify-center gap-y-[10px]">
        {sectionLabel && (
          <div className="text-heading4 text-tertiary sm:text-small">
            {sectionLabel}
          </div>
        )}
        <div className="flex w-full flex-col items-center justify-center gap-y-[10px] sm:items-start">
          {sectionItems.map((item: PopoverItemProps) => {
            return (
              <PopoverItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                showHover={true}
                onClick={() => {
                  if (item?.onClick) item.onClick();

                  // make sure when item is clicked, the popover is closed
                  if (closePopover) closePopover();
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export interface QuestionPopoverContentProps {
  title?: string;
  sections: PopoverSectionProps[];
  closePopover?: () => void;
  size?: "fixed" | "variable";
}

const QuestionPopoverContent = ({
  title,
  closePopover,
  sections,
  size = "fixed",
}: QuestionPopoverContentProps) => {
  return (
    <div
      className={clsx(
        "absolute inset-x-0 bottom-0 flex h-[400px] w-full flex-col overflow-y-auto rounded-brand bg-white p-[15px] shadow-[0px_-1px_10px_rgba(0,0,0,0.1)] drop-shadow-none sm:relative sm:max-h-[500px] sm:items-start sm:p-5 sm:shadow-none sm:drop-shadow-md",
        size === "fixed" ? "sm:h-[400px]" : "sm:h-auto"
      )}
    >
      {title && (
        <div className="invisible text-small font-semibold text-primary sm:visible sm:mb-5">
          {title}
        </div>
      )}

      <div className="flex w-full flex-col items-start gap-y-5">
        {sections.map((section: PopoverSectionProps) => {
          return (
            <PopoverSection
              key={section.sectionLabel}
              closePopover={closePopover}
              {...section}
            />
          );
        })}
      </div>
    </div>
  );
};

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  onClick(): void;
}

const PopoverTrigger = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
  <div className="hidden sm:inline-flex" ref={ref} onClick={props.onClick}>
    {props.children}
  </div>
));

export interface PopoverButtonProps {
  selectedItem: PopoverItemProps | undefined;
  height?: string | number;
}

export const PopoverButton = ({ selectedItem, height }: PopoverButtonProps) => {
  return (
    <>
      <>
        <div
          className="flex items-center justify-between gap-x-2 rounded-brand border border-border px-2.5 pl-2"
          style={{ height }}
        >
          <PopoverItem
            data-testid={`${selectedItem?.label}-popover-item`}
            label={selectedItem?.label ?? ""}
            icon={selectedItem?.icon}
            hideMobileStyle
          />
          <div className="h-5 w-5">
            <ChevronDownIcon />
          </div>
        </div>
      </>
    </>
  );
};

export interface QuestionPopoverProps {
  sections: PopoverSectionProps[];
  title?: string;
  closeOnClick?: boolean;
  children?: JSX.Element;
  variant?: "dropdown" | "popover";
  size?: "fixed" | "variable";
  selectedItem?: PopoverItemProps;
}

const QuestionPopover = ({
  title,
  children,
  closeOnClick,
  sections,
  variant = "popover",
  size = "fixed",
  selectedItem,
}: QuestionPopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMobilePopoverOpen, setIsMobilePopoverOpen] = useState(false);

  return (
    <>
      {/* for non-mobile views we use the Popover library */}
      <Popover
        isOpen={isPopoverOpen}
        positions={["top", "bottom"]}
        onClickOutside={() => setIsPopoverOpen(false)}
        align={"start"}
        containerClassName="hidden sm:block sm:relative sm:w-[240px] z-10"
        content={() => (
          <QuestionPopoverContent
            title={title}
            sections={sections}
            closePopover={() => {
              if (closeOnClick !== undefined && closeOnClick)
                setIsPopoverOpen(false);
            }}
            size={size}
          />
        )}
      >
        <PopoverTrigger onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
          {variant === "dropdown" && (
            <PopoverButton selectedItem={selectedItem} />
          )}
          {variant === "popover" && <>{children}</>}
        </PopoverTrigger>
      </Popover>

      {/* for mobile views we just use the content of the popover */}
      <div
        className="sm:hidden"
        onClick={() => {
          setIsMobilePopoverOpen(!isMobilePopoverOpen);
        }}
      >
        {variant === "dropdown" && (
          <PopoverButton selectedItem={selectedItem} />
        )}
        {variant === "popover" && <>{children}</>}
      </div>
      <Transition
        show={isMobilePopoverOpen}
        enter="transition-opacity duration-500 ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={"block sm:hidden"}
      >
        <Dialog
          open={isMobilePopoverOpen}
          onClose={() => {
            setIsMobilePopoverOpen(false);
          }}
        >
          <Dialog.Panel>
            <QuestionPopoverContent
              title={title}
              sections={sections}
              closePopover={() => {
                if (closeOnClick !== undefined && closeOnClick)
                  setIsMobilePopoverOpen(false);
              }}
            />
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
};
export default QuestionPopover;
