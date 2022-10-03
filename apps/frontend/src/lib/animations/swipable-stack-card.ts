const flyMove = 1800;

export const CardVariants = (length: number) => {
  return {
    enter: ({ direction }: any) => {
      return {
        x: direction > 0 ? 3 * 120 - 3 : -flyMove,
        scale: direction > 0 ? 0.8 : 0.9,
      };
    },
    center: ({ i }: any) => ({
      zIndex: length - i,
      x: i * 120 - i * Math.pow(3, 2),
      scale: 1 - 0.1 * i,
    }),
    exit: ({ direction, i }: any) => {
      return {
        zIndex: length - i,
        x: direction < 0 ? 3 * 120 - 3 * Math.pow(2, 2) : -flyMove,
        scale: direction < 0 ? 1 - 0.3 : 1,
        opacity: direction < 0 ? 0 : 1,
      };
    },
  };
};
