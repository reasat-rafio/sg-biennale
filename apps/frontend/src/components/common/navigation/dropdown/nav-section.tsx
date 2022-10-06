import { RedirectIcon } from "@components/icons/redirect";
import { Cta, Menu } from "@lib/@types/global.types";
import {
  ImageVariants,
  NevItemVariants,
} from "@lib/helpers/nav-dropdown.helpers";
import { useWindowSize } from "@lib/hooks";
import useGlobalStore from "@stores/global.store";
import { imageUrlBuilder } from "@utils/sanity";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { SanityImg, SanityImage } from "sanity-react-extra";

interface NavProps {
  image: SanityImage;
  menu: Menu[];
}

export const NavSection: React.FC<NavProps> = ({ menu, image }) => {
  const { showNavDropDown, setShowNavDropDown, navbarHeight } =
    useGlobalStore();
  const windowWidth = useWindowSize()?.width ?? 0;
  const [hoveredIdx, setHoveredIdx] = useState<null | number>(null);

  return (
    <section className="flex-1 flex">
      <div
        style={{
          marginTop: windowWidth >= 1024 ? navbarHeight : navbarHeight + 20,
        }}
        className=" flex-1 | grid grid-cols-12 justify-center lg:items-center"
      >
        <div className="lg:col-span-8 col-span-12 ">
          <ul className="2xl:space-y-5 sm:space-y-2 space-y-5">
            {menu.map(({ _key, slug, title }, index) => (
              <motion.li key={_key} className="overflow-hidden">
                <motion.span
                  initial="initial"
                  animate={showNavDropDown ? "enter" : "exit"}
                  variants={NevItemVariants}
                  className="flex items-center | space-x-3"
                  whileHover={{
                    color: "#000000",
                    transition: { duration: 0.4 },
                  }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => setShowNavDropDown(false)}
                >
                  <Link href={`/${slug.current}`}>
                    <a className="2xl:text-6xl xl:text-5xl md:text-heading-5 text-heading-6 font-medium sm:py-1">
                      {title}
                    </a>
                  </Link>

                  <RedirectIcon triggerAnimation={hoveredIdx === index} />
                </motion.span>
              </motion.li>
            ))}
          </ul>
        </div>
        <AnimatePresence>
          {showNavDropDown && (
            <motion.figure
              className="lg:flex hidden | flex-col justify-center items-center | lg:col-span-4 | h-[70vh] | overflow-hidden"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={ImageVariants}
            >
              <SanityImg
                className="h-full w-full object-contain"
                image={image}
                width={600}
                builder={imageUrlBuilder}
                alt=""
              />
            </motion.figure>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
// 1	1920×1080	104,190(22.62%)
// 2	1366×768	51,580(11.20%)
// 3	1440×900	44,003(9.55%)
// 4	1536×864	39,606(8.60%)
// 5	2560×1440	34,152(7.41%)
