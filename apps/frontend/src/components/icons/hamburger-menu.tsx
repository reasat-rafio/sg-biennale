interface HamburgerMenuProps {
  className?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  className = "h-6 w-6",
}) => {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="3" fill="black" fill-opacity="0.3" />
      <rect x="3" width="21" height="3" fill="black" />
      <rect y="9" width="24" height="3" fill="black" fill-opacity="0.3" />
      <rect x="13" y="9" width="11" height="3" fill="black" />
      <rect y="17" width="24" height="3" fill="black" fill-opacity="0.3" />
      <rect x="7" y="17" width="17" height="3" fill="black" />
    </svg>
  );
};
