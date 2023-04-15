import { AssetType, ContentType } from "../Input";

export interface ContainerizedAssetProps {
  asset: AssetType;
  height?: number | string;
  width?: number | string;
}

const ContainerizedAsset = ({
  asset,
  height,
  width,
}: ContainerizedAssetProps) => {
  return (
    <>
      <div
        style={{
          height,
          width,
        }}
        className={
          "inline-flex items-center justify-center rounded-brand border"
        }
      >
        {asset.type === ContentType.IMAGE_PNG ? (
          <img
            src={asset.url}
            height={height}
            width={width}
            className="h-full w-full rounded-brand object-contain"
            alt="image"
          />
        ) : (
          <video
            height={height}
            width={width}
            loop
            autoPlay
            playsInline
            className="h-full w-full rounded-brand object-contain"
          >
            <source src={asset.url} type={asset.type} />
          </video>
        )}
      </div>
    </>
  );
};

export default ContainerizedAsset;
