import { Variants } from "framer-motion";

export const ContainerVariants: Variants = {
  initial: {
    y: -50,
    height: 0,
  },
  enter: {
    y: 0,
    height: "100vh",
    transition: {
      delay: 0.1,
      duration: 0.7,
      damping: 2,
      ease: [0.2, 0.01, 0.3, 1],
    },
  },
  exit: {
    y: -50,
    height: 0,
    transition: {
      duration: 0.6,
      damping: 12,
      delay: 0.3,
      ease: [0.2, 0.5, 0.4, 1],
    },
  },
};

export const ContainerBrightBackgroundVariants = {
  initial: {
    y: -50,
    height: 0,
  },
  enter: {
    y: 0,
    height: "100vh",
    transition: {
      duration: 0.7,
      damping: 2,
      ease: [0.2, 0.5, 0.4, 1],
    },
  },
  exit: {
    y: -50,
    height: 0,
    transition: {
      delay: 0.4,
      duration: 0.5,
      damping: 12,
      ease: [0.2, 0.01, 0.3, 1],
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
