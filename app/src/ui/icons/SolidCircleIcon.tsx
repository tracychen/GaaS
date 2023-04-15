const SolidCircleIcon = ({
  color = "#000000",
  width = 14,
  height = 14,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6.59375" cy="6.89062" r="6.5" fill={color} />
      </svg>
    </>
  );
};

export default SolidCircleIcon;
