import clsx from "clsx";
import React from "react";

interface ContainerProps {
  className?: string;
  id?: string;
  type?: "section" | "div" | "p" | "footer" | "ul";
  children: React.ReactNode;
  style?: any;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  id,
  type = "div",
  style,
}) => {
  const Component = type;

  return (
    <Component
      style={style}
      id={id}
      className={clsx(
        "max-w-[1920px] | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md",
        className
      )}
    >
      {children}
    </Component>
  );
};
