import dynamic from "next/dynamic";
import { Menu } from "@lib/@types/global.types";
import { NevItemVariants } from "@lib/helpers/nav-dropdown.helpers";
import { useWindowSize } from "@lib/hooks";
import useGlobalStore from "@stores/global.store";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
const RedirectIcon = dynamic(() =>
  import("@components/icons/redirect").then((comp) => comp.RedirectIcon)
);

interface NavProps {
  menu: Menu[];
}

export const NavSection: React.FC<NavProps> = ({ menu }) => {
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
                    <a className="2xl:text-[3rem] xl:text-[2.8rem] md:text-heading-5 text-heading-6 font-medium sm:py-1">
                      {title}
                    </a>
                  </Link>

                  <RedirectIcon triggerAnimation={hoveredIdx === index} />
                </motion.span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
