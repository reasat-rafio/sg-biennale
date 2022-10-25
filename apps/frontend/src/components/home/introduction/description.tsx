import { useIntersection } from "@lib/hooks";
import { useRef } from "react";
import { motion, Variants } from "framer-motion";

interface DescriptionProps {
  subtitle: string;
  description: string;
}

const LetterVariant: Variants = {
  initial: {
    opacity: 0.3,
  },
  animate: {
    opacity: 1,
  },
};

export const Description: React.FC<DescriptionProps> = ({
  subtitle,
  description,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const intersection = useIntersection(subtitleRef, { threshold: 0.25 });

  const letters = Array.from(subtitle);
  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col space-y-8 max-w-7xl mx-auto pt-xl"
    >
      <motion.h4
        ref={subtitleRef}
        initial="initial"
        animate={intersection?.isIntersecting && "animate"}
        transition={{
          staggerChildren: intersection?.isIntersecting ? 0.03 : 0,
        }}
        className="xl:text-heading-3 lg:text-heading-4 text-heading-6 font-medium leading-tight text-black"
      >
        {letters.map((letter, index) => (
          <motion.span
            transition={{
              damping: 15,
              stiffness: 200,
            }}
            variants={LetterVariant}
            key={index + letter}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h4>
      <p className="text-gray--700 font-manrope lg:text-body-1 text-body-2">
        {description}
      </p>
    </motion.div>
  );
};
