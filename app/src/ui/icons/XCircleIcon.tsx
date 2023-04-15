const XCircleIcon = ({
  color = "#000000",
  width = 13,
  height = 13,
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
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.09375 5.09863L7.76042 7.7653M7.76042 5.09863L5.09375 7.7653M11.7604 6.43197C11.7604 7.13235 11.6225 7.82587 11.3544 8.47294C11.0864 9.12001 10.6936 9.70796 10.1983 10.2032C9.70307 10.6984 9.11513 11.0913 8.46806 11.3593C7.82099 11.6273 7.12747 11.7653 6.42708 11.7653C5.7267 11.7653 5.03317 11.6273 4.38611 11.3593C3.73904 11.0913 3.15109 10.6984 2.65585 10.2032C2.1606 9.70796 1.76775 9.12001 1.49973 8.47294C1.2317 7.82587 1.09375 7.13235 1.09375 6.43197C1.09375 5.01748 1.65565 3.66092 2.65585 2.66073C3.65604 1.66054 5.0126 1.09863 6.42708 1.09863C7.84157 1.09863 9.19813 1.66054 10.1983 2.66073C11.1985 3.66092 11.7604 5.01748 11.7604 6.43197Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};

export default XCircleIcon;
