import { useTransformSpring } from "@lib/helpers/animation.helpers";
import clsx from "clsx";
import { transform, useMotionValue, motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";

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
        <Link href={href ?? "/"} prefetch={false}>
          <a className={clsx(defaultStyles, variantStyles[variant], "")}>
            {children}
            {icon && icon}
          </a>
        </Link>
      )}
    </>
  );
};

const physics = {
  damping: 30,
  stiffness: 60,
  bounce: 0.1,
  mass: 10,
};
export const BButton = ({ children }: any) => {
  const rotateValue = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const rotateY = useTransformSpring({
    value: rotateValue,
    outputRange: hovered ? [-20, 20] : [0, 0],
    physics,
  });
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (event: any) => {
    if (btnRef?.current) {
      const maxWidth = btnRef.current?.getBoundingClientRect().width;

      const rotateY = transform(
        [0, maxWidth],
        [1, 0]
      )(Math.abs(btnRef.current?.getBoundingClientRect().left - event.clientX));
      rotateValue.set(rotateY);
    }
  };

  return (
    <motion.button
      ref={btnRef}
      // style={{ rotateY: 100 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={clsx(defaultStyles, variantStyles.primary, "")}
    >
      {children}
    </motion.button>
  );
};
