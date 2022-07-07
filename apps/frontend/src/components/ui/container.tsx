import clsx from "clsx";
import React from "react";

interface ContainerProps {
  className?: string;
  id?: string;
  type?: "section" | "div";
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  id,
  type = "div",
}) => {
  const Component = type;

  return (
    <Component
      id={id}
      className={clsx("max-w-[1920px] | lg:px-14 px-6", className)}
    >
      {children}
    </Component>
  );
};
