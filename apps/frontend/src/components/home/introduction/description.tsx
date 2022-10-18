import { useIntersection, useWindowSize } from "@lib/hooks";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";

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

const skewConfig = { ease: 0.1, current: 0, previous: 0, rounded: 0 };

export const Description: React.FC<DescriptionProps> = ({
  subtitle,
  description,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const containerRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const intersection = useIntersection(subtitleRef, { threshold: 0.25 });

  const motionSkew = useMotionValue(0);
  const animatedMotionSkewY = useSpring(motionSkew, { damping: 15 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const skewScrolling = () => {
        //Set Current to the scroll position amount
        skewConfig.current = window.scrollY;
        // Set Previous to the scroll previous position
        skewConfig.previous +=
          (skewConfig.current - skewConfig.previous) * skewConfig.ease;
        // Set rounded to
        skewConfig.rounded = Math.round(skewConfig.previous * 100) / 100;

        // Difference between
        const difference = skewConfig.current - skewConfig.rounded;
        const acceleration = difference / windowWidth;
        const velocity = +acceleration;
        const skew = velocity * 5;
        motionSkew.set(skew);
      };

      window.addEventListener("scroll", () => {
        skewScrolling();
      });
    }
  }, [windowWidth]);

  const letters = Array.from(subtitle);
  return (
    <motion.div
      ref={containerRef}
      style={{ skewY: animatedMotionSkewY }}
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
