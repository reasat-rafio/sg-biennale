import { AnimatePresence, motion } from "framer-motion";
import { ISite } from "@lib/@types/global.types";
import {
  ContainerBrightBackgroundVariants,
  ContainerVariants,
} from "@lib/helpers/nav-dropdown.helpers";
import useGlobalStore from "@stores/global.store";
import { CTA } from "./cta";
import { Nav } from "./nav";
import { useEffect } from "react";
import { lockBody, unlockBody } from "@lib/helpers/global.helpers";

export const NavDropdown: React.FC<ISite["site"]> = ({
  navigations: { menu, cta },
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
            className="z-30 fixed top-0 left-0 | w-screen | bg-white shadow-xl py-14"
          >
            <div className="flex flex-col space-y-4 | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md mx-auto | mt-10">
              <Nav image={image} menu={menu} />
              {/* <CTA menuLength={menu.length} social={social} cta={cta} /> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
};
