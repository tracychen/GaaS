export function Shimmer({ height = 24, width }: { height?: any; width?: any }) {
  return (
    <>
      <div
        style={{ height, width }}
        className="animate-pulse rounded-md bg-gray-400/20"
      ></div>
    </>
  );
}
