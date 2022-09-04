import { Variants } from "framer-motion";

export const SlideUpLetterVariants = ({
  duration = 0.7,
}: {
  duration?: number;
}): Variants => ({
  initial: {
    translateY: "100%",
    rotateX: "-95deg",
    rotateY: 120,
  },
  animate: (delay: number) => ({
    rotateX: 0,
    translateY: 0,
    rotateY: 0,
    transition: {
      delay: delay,
      type: "tween",
      ease: "easeInOut",
      duration: duration,
    },
  }),
});
