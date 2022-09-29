import clsx from "clsx";
import { ReactNode } from "react";

interface DescriptionProps {
  color?: string;
  size?: "lg" | "sm";
  children: ReactNode;
}

const styles = {
  lg: "lg:text-body-1 text-body-2",
  sm: "text-body-2",
};

export const Description: React.FC<DescriptionProps> = ({
  size = "lg",
  color = "#4D4D4D",
  children,
}) => {
  return (
    <p style={{ color }} className={clsx("font-manrope", styles[size])}>
      {children}
    </p>
  );
};
