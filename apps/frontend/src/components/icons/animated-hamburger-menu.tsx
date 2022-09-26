import { motion } from "framer-motion";

interface AnimatedHamburgerMenuProps {
  animate: boolean;
  onClick?: (e: any) => any;
}

const transition = {
  type: "ease",
  duration: 0.4,
};

export const AnimatedHamburgerMenu: React.FC<AnimatedHamburgerMenuProps> = ({
  animate,
  onClick,
}) => {
  return (
    <motion.svg
      onClick={onClick}
      className="cursor-pointer"
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="initial"
      animate="animate"
    >
      <motion.rect
        height="2.5"
        fill="black"
        initial={{
          width: 24,
          rotate: 0,
          y: 0,
        }}
        animate={{
          width: animate ? 24 : 24,
          transition,
          rotate: animate ? -45 : 0,
          y: animate ? "45%" : 0,
        }}
      />

      <motion.rect
        y="9"
        height="2.5"
        fill="black"
        initial={{
          width: 18,
          opacity: 1,
        }}
        animate={{
          width: animate ? 24 : 18,
          transition,
          opacity: animate ? 0 : 1,
        }}
      />

      <motion.rect
        y="17"
        height="2.5"
        fill="black"
        initial={{
          width: 13,
          rotate: 0,
          y: 0,
        }}
        animate={{
          width: animate ? 24 : 13,
          transition,
          rotate: animate ? 45 : 0,
          y: animate ? "-60%" : 0,
        }}
      />
    </motion.svg>
  );
};
