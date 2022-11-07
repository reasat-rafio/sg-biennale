import { AnimatePresence, motion } from "framer-motion";
import { ISite } from "@lib/@types/global.types";
import {
  ContainerBrightBackgroundVariants,
  ContainerVariants,
} from "@lib/helpers/nav-dropdown.helpers";
import useGlobalStore from "@stores/global.store";
import { NavSection } from "./nav-section";
import { CTASection } from "./cta-section";

export const NavDropdown: React.FC<ISite["site"]> = ({
  navigations: { menu, ctas },
  footer: { social },
}) => {
  const { showNavDropDown } = useGlobalStore();

  return (
    <>
      <AnimatePresence>
        {showNavDropDown && (
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={ContainerVariants}
            className="z-30 fixed top-0 left-0 | w-screen | bg-white shadow-xl"
          >
            <div className="h-full w-full | flex flex-col justify-center | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md mx-auto">
              <NavSection menu={menu} />
              <CTASection ctas={ctas} social={social} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <BrightAnimatedBackGround showNavDropDown={showNavDropDown} />
    </>
  );
};

const BrightAnimatedBackGround: React.FC<{ showNavDropDown: boolean }> = ({
  showNavDropDown,
}) => {
  return (
    <AnimatePresence>
      {showNavDropDown && (
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={ContainerBrightBackgroundVariants}
          className="z-20 fixed top-0 left-0 | w-screen | bg-red-love | will-change-transform"
        />
      )}
    </AnimatePresence>
  );
};
