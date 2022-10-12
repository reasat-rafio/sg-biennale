interface SortIconProps {}

export const SortIcon: React.FC<SortIconProps> = ({}) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.6"
        y="0.6"
        width="6.8"
        height="6.8"
        stroke="black"
        strokeWidth="1.2"
      />
      <rect
        x="10.6"
        y="0.6"
        width="6.8"
        height="6.8"
        stroke="black"
        strokeWidth="1.2"
      />
      <rect
        x="0.6"
        y="10.6"
        width="6.8"
        height="6.8"
        stroke="black"
        strokeWidth="1.2"
      />
      <rect
        x="10.6"
        y="10.6"
        width="6.8"
        height="6.8"
        stroke="black"
        strokeWidth="1.2"
      />
    </svg>
  );
};
