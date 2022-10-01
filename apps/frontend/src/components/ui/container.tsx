import clsx from "clsx";
import React, { RefObject, useRef } from "react";

interface ContainerProps {
  className?: string;
  id?: string;
  type?: "section" | "div" | "p" | "footer" | "ul" | "article";
  children: React.ReactNode;
  style?: any;
  ref?: RefObject<any>;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  id,
  type = "div",
  style,
  ref,
}) => {
  const Component = type;
  const containerRef = useRef(null);

  return (
    <Component
      ref={ref ? ref : containerRef}
      style={style}
      id={id}
      className={clsx(
        "max-w-[1920px] | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md mx-auto",
        className
      )}
    >
      {children}
    </Component>
  );
};
