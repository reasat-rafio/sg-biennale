import clsx from "clsx";

interface AnchorProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Anchor: React.FC<AnchorProps> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <span
      onClick={onClick}
      className={clsx(
        className,
        "underline cursor-pointer | font-medium lg:text-xl text-base"
      )}
    >
      {children}
    </span>
  );
};
