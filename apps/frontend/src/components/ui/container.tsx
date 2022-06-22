import clsx from "clsx";
import React from "react";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
}) => {
  return <div className={clsx(className)}>{children}</div>;
};
