import clsx from "clsx";
import Link from "next/link";
import { MouseEvent } from "react";

interface AnchorProps {
  className?: string;
  href?: string;
  children: React.ReactNode;
  onClick?: (e?: MouseEvent<HTMLAnchorElement>) => void;
}

export const Anchor: React.FC<AnchorProps> = ({
  className,
  children,
  href,
  onClick,
}) => {
  return (
    <Link href={href ?? "/"}>
      <a
        onClick={onClick}
        className={clsx(
          className,
          "underline cursor-pointer | font-medium lg:text-xl text-base"
        )}
      >
        {children}
      </a>
    </Link>
  );
};
