import { ReactNode, RefObject } from "react";
import { motion } from "framer-motion";
import { SlideUpLetterVariants } from "@lib/animations/slideup-letter";
import clsx from "clsx";

interface SlideupLettersAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animationType?: "inview" | "pageload";
  intersecting?: boolean;
}

export const SlideupLettersAnimation: React.FC<
  SlideupLettersAnimationProps
> = ({
  children,
  className,
  delay = 0.1,
  animationType = "pageload",
  intersecting,
}) => {
  const letters = Array.from(children as string);

  return (
    <>
      {letters.map((letter, index) => (
        <motion.span
          key={letter + index}
          className={clsx(className, "inline-block whitespace-pre")}
          initial="initial"
          animate={
            animationType === "pageload"
              ? "animate"
              : animationType === "inview"
              ? intersecting
                ? "animate"
                : "initial"
              : "initial"
          }
          variants={SlideUpLetterVariants({})}
          custom={index * delay}
        >
          {letter}
        </motion.span>
      ))}
    </>
  );
};
