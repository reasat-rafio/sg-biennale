import { Site } from "@lib/@types/global.types";
import { NavHeader } from "./nav-header";
import React, { useRef } from "react";
import useGlobalStore from "@stores/global.store";
import { motion } from "framer-motion";
import { NavItems } from "./nav-items";
import { useWindowScroll } from "@lib/hooks";
import clsx from "clsx";

export const Navbar: React.FC<Site> = ({
  logo,
  eventLogo,
  navigations: { ctas },
}) => {
  const { showNavDropDown } = useGlobalStore();
  const navbarRef = useRef<HTMLElement | null>(null);
  const scroll = useWindowScroll()?.y ?? 0;

  return (
    <motion.nav
      ref={navbarRef}
      // initial={{ backgroundColor: "white" }}
      // animate={{
      //   backgroundColor: showNavDropDown ? "transparent" : "white",
      // }}
      id="navbar"
      className={clsx(
        "lg:sticky top-0 left-0 z-40  | transition-all duration-500 ease-in-out",
        scroll && !showNavDropDown && "backdrop-blur-lg bg-white/30 shadow-md"
      )}
    >
      <NavHeader logo={logo} eventLogo={eventLogo} />
      <NavItems ctas={ctas} />
    </motion.nav>
  );
};
