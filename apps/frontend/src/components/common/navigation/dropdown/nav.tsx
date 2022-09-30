import { RedirectIcon } from "@components/icons/redirect";
import { Menu } from "@lib/@types/global.types";
import {
  ImageVariants,
  NevItemVariants,
} from "@lib/helpers/nav-dropdown.helpers";
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

export const Nav: React.FC<NavProps> = ({ menu, image }) => {
  const { showNavDropDown, setShowNavDropDown } = useGlobalStore();
  const [hoveredIdx, setHoveredIdx] = useState<null | number>(null);

  return (
    <div className="flex-1 | grid grid-cols-12 justify-center items-center">
      <section className="col-span-6 ">
        <ul className="space-y-5">
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
                  <a className="text-heading-3 font-medium">{title}</a>
                </Link>

                <RedirectIcon triggerAnimation={hoveredIdx === index} />
              </motion.span>
            </motion.li>
          ))}
        </ul>
      </section>
      <AnimatePresence>
        {showNavDropDown && (
          <motion.figure
            className="flex flex-col justify-center items-center | col-span-6 | h-[70vh] | overflow-hidden"
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
  );
};
