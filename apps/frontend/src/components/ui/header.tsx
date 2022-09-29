import clsx from "clsx";
import { ReactNode } from "react";

interface PageHeaderProps {
  color?: string;
  fontWeight?: 500 | 600 | 700 | 800;
  variant?: "primary" | "secondary";
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: ReactNode;
}

const styles = {
  primary: "xl:text-heading-4 text-heading-5",
  secondary: "xl:text-heading-6 text-[24px]",
};
export const Header: React.FC<PageHeaderProps> = ({
  type = "h4",
  variant = "primary",
  fontWeight = 500,
  color = "#000000",
  className,
  children,
}) => {
  const Element = type;

  return (
    <Element
      style={{ color, fontWeight }}
      className={clsx("overflow-hidden", className, styles[variant])}
    >
      {children}
    </Element>
  );
};
