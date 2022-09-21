import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "tertiary" | "secondary";
  type?: "href" | "button";
  href?: string;
  children: ReactNode;
  icon?: JSX.Element;
  className?: string;
  onClick?: () => any;
}

const defaultStyles =
  "flex items-center justify-center | w-fit | font-medium lg:text-[18px] text-base leading-[-0.02em] | lg:px-12 sm:px-8 px-6 py-3 sm:gap-2 gap-1";
const variantStyles = {
  primary: "text-white bg-black | rounded-[74px] text-center",
  secondary: "text-black bg-transparent | border border-black | rounded-[74px]",
  tertiary: "text-black bg-transparent underline",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  type = "button",
  href,
  children,
  className,
  icon,
  onClick,
}) => {
  return (
    <>
      {type === "button" && (
        <button
          onClick={onClick}
          className={clsx(defaultStyles, className, variantStyles[variant])}
        >
          {children}
          {icon && icon}
        </button>
      )}
      {type === "href" && (
        <Link href={href ?? "/"}>
          <a className={clsx(defaultStyles, variantStyles[variant], "")}>
            {children}
            {icon && icon}
          </a>
        </Link>
      )}
    </>
  );
};
