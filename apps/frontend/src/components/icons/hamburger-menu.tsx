import useGlobalStore from "@stores/global-store";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const transition = {
  type: "ease",
  duration: 0.4,
};

interface HamburgerMenuProps {
  className?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  className = "h-6 w-6",
}) => {
  const [animate, setAnimation] = useState(false);
  const { showNavDropDown, setShowNavDropDown } = useGlobalStore();

  return (
    <motion.svg
      className="cursor-pointer"
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="initial"
      animate="animate"
      style={{ rotate: 180 }}
      onMouseEnter={() => setAnimation(true)}
      onMouseLeave={() => setAnimation(false)}
      onClick={() => setShowNavDropDown(!showNavDropDown)}
      // whileHover={{ rotate: showNavDropDown ? 360 : 0 }}
    >
      <motion.rect
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: showNavDropDown ? 0 : 1,
        }}
        width="24"
        height="3"
        fill="black"
        fillOpacity="0.3"
      />
      <motion.rect
        height="3"
        fill="black"
        initial={{
          width: 17,
          rotate: 0,
          y: 0,
        }}
        animate={{
          width: showNavDropDown ? 24 : animate ? 24 : 17,
          transition,
          rotate: showNavDropDown ? -45 : 0,
          y: showNavDropDown ? "52%" : 0,
        }}
      />
      <motion.rect
        initial={{ opacity: 1 }}
        animate={{ opacity: showNavDropDown ? 0 : 1 }}
        y="9"
        width="24"
        height="3"
        fill="black"
        fillOpacity="0.3"
      />
      <motion.rect
        y="9"
        height="3"
        fill="black"
        initial={{
          width: 12,
          opacity: 1,
        }}
        animate={{
          width: showNavDropDown ? 24 : animate ? 24 : 12,
          transition,
          opacity: showNavDropDown ? 0 : 1,
        }}
      />
      <motion.rect
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: showNavDropDown ? 0 : 1,
        }}
        y="17"
        width="24"
        height="3"
        fill="black"
        fillOpacity="0.3"
      />
      <motion.rect
        y="17"
        height="3"
        fill="black"
        initial={{
          width: 19,
          rotate: 0,
          y: 0,
        }}
        animate={{
          width: showNavDropDown ? 24 : animate ? 24 : 19,
          transition,
          rotate: showNavDropDown ? 45 : 0,
          y: showNavDropDown ? "-52%" : 0,
        }}
      />
    </motion.svg>
  );
};
