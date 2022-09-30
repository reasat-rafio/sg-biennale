import { AnimatePresence, motion } from "framer-motion";
import { ISite } from "@lib/@types/global.types";
import {
  ContainerBrightBackgroundVariants,
  ContainerVariants,
} from "@lib/helpers/nav-dropdown.helpers";
import useGlobalStore from "@stores/global.store";
import { useEffect } from "react";
import { lockBody, unlockBody } from "@lib/helpers/global.helpers";
import Link from "next/link";
import { NavSection } from "./nav-section";
import { CTASection } from "./cta-section";

export const NavDropdown: React.FC<ISite["site"]> = ({
  navigations: { menu, ctas },
  footer: { image, social },
}) => {
  const { showNavDropDown } = useGlobalStore();

  // useEffect(() => {
  //   showNavDropDown ? lockBody() : unlockBody();
  // }, [showNavDropDown]);

  return (
    <>
      <AnimatePresence>
        {showNavDropDown && (
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={ContainerVariants}
            className="z-30 fixed top-0 left-0 | w-screen | bg-white shadow-xl "
          >
            <div className="h-full w-full | flex flex-col justify-center | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md mx-auto">
              <NavSection image={image} menu={menu} />
              <CTASection ctas={ctas} social={social} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BrightAnimatedBackGround />
    </>
  );
};

const BrightAnimatedBackGround: React.FC<{}> = () => {
  const { showNavDropDown } = useGlobalStore();
  return (
    <AnimatePresence>
      {showNavDropDown && (
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={ContainerBrightBackgroundVariants}
          className="z-20 fixed top-0 left-0 | w-screen | bg-red-love"
        />
      )}
    </AnimatePresence>
  );
};
