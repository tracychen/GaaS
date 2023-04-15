"use client";

import clsx from "clsx";
import { forwardRef, useState, type ComponentProps } from "react";
import ContainerizedAsset from "./utils/ContainerizedAsset";

const assetSize = 260;

export enum ContentType {
  VIDEO_MP4 = "video/mp4",
  IMAGE_PNG = "image/png",
}

export interface AssetType {
  url: string;
  type: ContentType;
}

export interface InputProps extends ComponentProps<"input"> {
  label?: string;
  suffix?: string;
  asset?: AssetType;
  error?: string;
}

export const radioButtonStyle =
  "relative h-6 w-6 shrink-0 rounded-full border-2 border-border bg-input ";
export const checkboxBaseStyle =
  "h-6 w-6 rounded-[.25rem] bg-input select-none shrink-0";
export const textInputStyle =
  "error:border-error w-full rounded-md border-2 border-border bg-white p-5 text-body text-primary transition-colors duration-150 ease-out placeholder:text-placeholder focus:border-primary focus:outline-none focus:ring-0 disabled:bg-input disabled:opacity-60";
export const numberInputStyle =
  "error:border-error w-[160px] rounded-lg border-2 border-border bg-white p-5 text-body text-primary transition-colors duration-150 ease-out placeholder:text-placeholder focus:border-primary focus:outline-none focus:ring-0 disabled:bg-input disabled:opacity-60";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    suffix,
    asset,
    error,
    type = "text",
    autoComplete = "off",
    ...props
  },
  ref
) {
  const [effect, setEffect] = useState(false);

  if (type === "radio") {
    return (
      <div
        className="relative flex flex-col flex-nowrap gap-x-5"
        onClick={() => {
          setEffect(true);
        }}
      >
        {asset && (
          <div className="mb-3">
            <ContainerizedAsset
              asset={asset}
              height={assetSize}
              width={assetSize}
            />
          </div>
        )}

        <label className="inline-flex cursor-pointer items-center gap-x-2">
          <input
            className="peer pointer-events-none absolute left-2 h-0 w-0 opacity-0"
            type={type}
            ref={ref}
            {...props}
          />
          {asset && (
            <div className="absolute top-0 h-[260px] w-[260px] rounded-brand border border-primary opacity-0 transition-opacity duration-100 ease-out peer-checked:opacity-100" />
          )}

          <div
            data-testid={`[${label}]-radio`}
            className={clsx(radioButtonStyle, "peer-checked:invisible")}
          />

          <div className="invisible -ml-8 h-6 w-6 shrink-0 rounded-full bg-primary p-0.5 peer-checked:visible">
            <div className="relative h-full w-full rounded-full bg-white p-1">
              <div className="h-full w-full rounded-full bg-primary"></div>
              {effect && (
                <div
                  className={clsx(
                    "absolute bottom-0 left-0 h-full w-full rounded-full border border-primary",
                    effect && "animate-ping-finite"
                  )}
                  onAnimationEnd={() => {
                    setEffect(false);
                  }}
                ></div>
              )}
            </div>
          </div>

          <p className="text-small leading-6">{label}</p>
        </label>
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="relative flex flex-col flex-nowrap gap-x-5">
        {asset && (
          <div className="mb-3">
            <ContainerizedAsset
              asset={asset}
              height={assetSize}
              width={assetSize}
            />
          </div>
        )}

        <label
          className="inline-flex cursor-pointer items-center gap-x-2"
          onClick={() => {
            setEffect(true);
          }}
        >
          <input
            className="peer pointer-events-none absolute left-2 h-0 w-0 opacity-0"
            type={type}
            ref={ref}
            {...props}
          />

          {asset && (
            <div className="absolute top-0 h-[260px] w-[260px] rounded-brand border border-primary opacity-0 transition-opacity duration-100 ease-out peer-checked:opacity-100" />
          )}

          <div
            data-testid={`[${label}]-checkbox`}
            className={clsx(
              checkboxBaseStyle,
              "border-2 peer-checked:opacity-0"
            )}
          />
          <div
            className={clsx(
              checkboxBaseStyle,
              "invisible relative -ml-8 bg-primary peer-checked:visible"
            )}
          >
            <div className="text-center font-sans font-semibold !text-white">
              &#10003;
            </div>
            {effect && (
              <div
                className={clsx(
                  "absolute bottom-0 left-0 h-full w-full rounded-full border border-primary",
                  effect && "animate-ping-finite"
                )}
                onAnimationEnd={() => {
                  setEffect(false);
                }}
              ></div>
            )}
          </div>
          <p className="text-small leading-6">{label}</p>
        </label>
      </div>
    );
  }

  if (type === "text" || type === "password") {
    return (
      <div>
        {label && <div className="mb-1 font-medium">{label}</div>}
        <div className="inline-flex w-full items-center gap-x-2">
          <input
            className={textInputStyle}
            type={type}
            ref={ref}
            autoComplete={autoComplete}
            {...props}
          />
          {suffix && <div>{suffix}</div>}
        </div>
        {/* {error && <ErrorMessage error={error} />} */}
      </div>
    );
  }
  if (type === "number") {
    return (
      <div>
        {label && <div className="mb-1 font-medium">{label}</div>}
        <div className="inline-flex w-full items-center gap-x-2">
          <input
            className={numberInputStyle}
            type={type}
            ref={ref}
            autoComplete={autoComplete}
            {...props}
          />
          {suffix && <div>{suffix}</div>}
        </div>

        {/* {error && <ErrorMessage error={error} />} */}
      </div>
    );
  }

  if (type === "switch") {
    return (
      <label className="relative cursor-pointer self-start">
        <input
          type="checkbox"
          {...props}
          ref={ref}
          value=""
          className="peer sr-only"
        />
        <div
          data-testid={`${label || props.name}-switch`}
          className="peer h-6 w-11 rounded-full bg-tertiary after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gradient-linear-bluegreen peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"
        ></div>
      </label>
    );
  }

  return <input type={type} {...props}></input>;
});
