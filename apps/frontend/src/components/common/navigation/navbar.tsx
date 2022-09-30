import { Site } from "@lib/@types/global.types";
import { NavHeader } from "./nav-header";
import React from "react";
import useGlobalStore from "@stores/global.store";
import { motion } from "framer-motion";
import { NavItems } from "./nav-items";

export const Navbar: React.FC<Site> = ({
  logo,
  eventLogo,
  navigations: { ctas },
}) => {
  const { showNavDropDown } = useGlobalStore();

  return (
    <motion.nav
      // initial={{ backgroundColor: "white" }}
      // animate={{
      //   backgroundColor: showNavDropDown ? "transparent" : "white",
      //   transition: { delay: 1 },
      // }}
      id="navbar"
      className="lg:sticky top-0 left-0 z-40 bg-white shadow"
    >
      <NavHeader logo={logo} eventLogo={eventLogo} />
      <NavItems ctas={ctas} />
    </motion.nav>
  );
};
