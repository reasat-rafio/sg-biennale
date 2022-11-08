import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

interface PageHeaderProps {
  color?: string;
  fontWeight?: 500 | 600 | 700 | 800;
  variant?: "primary" | "secondary";
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a";
  className?: string;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

const styles = {
  primary: "xl:text-heading-4 text-heading-5 py-1",
  secondary: "xl:text-heading-6 text-[24px] py-1",
};
export const Header: React.FC<PageHeaderProps> = ({
  type = "h4",
  variant = "primary",
  fontWeight = 500,
  color = "#000000",
  className,
  children,
  href,
  onClick,
}) => {
  const Element = type;

  return (
    <>
      {type === "a" ? (
        <Link href={href ?? "/"}>
          <a
            style={{ color, fontWeight }}
            className={clsx("overflow-hidden", className, styles[variant])}
          >
            {children}
          </a>
        </Link>
      ) : (
        <Element
          style={{ color, fontWeight }}
          className={clsx("overflow-hidden", className, styles[variant])}
          onClick={onClick}
        >
          {children}
        </Element>
      )}
    </>
  );
};
