import { Variants } from "framer-motion";

export const ContainerVariants: Variants = {
  initial: {
    y: -50,
    height: 0,
    display: "none",
  },
  enter: {
    y: 0,
    height: "100vh",
    display: "block",
    transition: { duration: 0.8, damping: 2, ease: "easeInOut" },
  },
  exit: {
    y: -50,
    height: 0,
    display: "none",
    transition: {
      duration: 0.5,
      damping: 12,
      delay: 0.3,
      display: {
        delay: 0.8,
      },
    },
  },
};

export const NevItemVariants: Variants = {
  initial: {
    opacity: 0,
    color: "#999999",
  },
  enter: (stagging: number) => ({
    opacity: 1,
    transition: {
      delay: 0.5 + stagging,
    },
  }),
  exit: {
    opacity: 0,
  },
};

export const ImageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.7, type: "tween" },
  },
  exit: {
    scale: 0.7,
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
};

export const CTAVarinats: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  enter: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: delay, type: "tween" },
  }),
  exit: {
    scale: 0.7,
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
};

export const RedirectIconVariant: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  enter: { opacity: 1, scale: 1 },
  exit: { scale: 0.7, opacity: 0 },
};
