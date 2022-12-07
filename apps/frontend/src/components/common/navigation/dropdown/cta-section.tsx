import { Cta } from "@lib/@types/global.types";
import { CTAVarinats } from "@lib/helpers/nav-dropdown.helpers";
import useGlobalStore from "@stores/global.store";
import { imageUrlBuilder } from "@utils/sanity";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface CtaProps {
  ctas: Cta[];
}

export const CTASection: React.FC<CtaProps> = ({ ctas }) => {
  const { showNavDropDown, navbarHeight } = useGlobalStore();
  return (
    <AnimatePresence>
      {showNavDropDown && (
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={CTAVarinats}
          className="flex flex-col "
          style={{ marginTop: navbarHeight + 5 }}
        >
          <div className="lg:hidden grid grid-cols-12 gap-3">
            {ctas.map(({ href, title, _key, icon }) => (
              <Link href={href} key={_key} prefetch={false}>
                <a
                  key={_key}
                  className="flex space-x-2 items-center | col-span-6 md:col-span-4 | bg-[#F8F8F8] sm:p-4 p-3 rounded-lg"
                >
                  <figure className="w-4 h-4">
                    <SanityImg
                      className="h-full w-full object-contain"
                      image={icon}
                      builder={imageUrlBuilder}
                      width={15}
                      alt="icon"
                    />
                  </figure>
                  <span className="lg:text-body-1 md:text-body-2 text-xs">
                    {title}
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
