import { Menu } from "@headlessui/react";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { ColorType } from "./Text";
import { Text } from "./Text";

const textOverflowStyle = "text-ellipsis whitespace-nowrap overflow-hidden";
const iconStyle = "!h-5 !w-5 mr-2 flex items-center justify-center";

export interface DropdownMenuItemProps {
  label: string;
  icon: ReactNode;
  color?: ColorType;
  onClick: () => void;
}

const DropdownMenuItem = ({
  label,
  icon,
  color,
  onClick,
}: DropdownMenuItemProps) => {
  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <button
            data-testid={`[${label}]-dropdown-menu-item`}
            type="button"
            className={clsx(
              active && "bg-input",
              textOverflowStyle,
              "group flex w-full items-center rounded-brand p-2"
            )}
            onClick={onClick}
          >
            {icon && (
              <figure className={clsx(iconStyle, color && `text-${color}`)}>
                {icon}
              </figure>
            )}
            <div
              className={clsx(textOverflowStyle, "inline-flex items-center")}
            >
              <Text variant={"small"} color={color}>
                {label}
              </Text>
            </div>
          </button>
        )}
      </Menu.Item>
    </>
  );
};

export interface DropdownProps {
  className?: string;
  children: ReactNode;
  items: DropdownMenuItemProps[];
  width?: Number | string;
  color: ColorType;
}

export const Dropdown = ({
  className,
  children,
  items,
  width,
  height,
  color,
}: any) => {
  return (
    <Menu>
      {() => (
        <div className={clsx(className, "relative")}>
          <Menu.Button as="button" style={{ width }}>
            {children}
          </Menu.Button>
          <Menu.Items
            className={clsx(
              !width && "min-w-[160px]",
              "absolute right-0 z-10 mt-2 max-h-[150px] overflow-hidden overflow-y-auto rounded-brand bg-white p-1 drop-shadow-md focus:outline-none sm:left-0 sm:right-auto"
            )}
            style={{ width, height }}
          >
            {items?.map((item: DropdownMenuItemProps) => {
              return (
                <DropdownMenuItem
                  key={item.label}
                  color={color}
                  {...item}
                  onClick={async () => {
                    await item.onClick();
                  }}
                />
              );
            })}
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
};
