import { Cta, FooterSocial } from "@lib/@types/global.types";
import { CTAVarinats } from "@lib/helpers/nav-dropdown.helpers";
import useGlobalStore from "@stores/global.store";
import { imageUrlBuilder } from "@utils/sanity";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface CtaProps {
  social: FooterSocial;
  ctas: Cta[];
}

export const CTASection: React.FC<CtaProps> = ({ social, ctas }) => {
  const { showNavDropDown } = useGlobalStore();
  return (
    <AnimatePresence>
      {showNavDropDown && (
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={CTAVarinats}
          className="flex flex-col my-5"
        >
          <div className="lg:hidden grid grid-cols-12 gap-3">
            {ctas.map(({ href, title, _key, icon }) => (
              <Link href={href} key={_key}>
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
          <div className="space-x-5 lg:justify-end lg:flex hidden">
            <span className="font-manrope lg:text-xl text-base font-semibold">
              Social Media
            </span>
            <div className="flex justify-end space-x-4">
              {social.socials.map(({ _key, icon, url }) => (
                <Link href={url} key={_key}>
                  <a key={_key}>
                    <figure className="w-6 h-6">
                      <SanityImg
                        className="h-full w-full object-contain"
                        image={icon}
                        builder={imageUrlBuilder}
                        width={20}
                        alt="icon"
                      />
                    </figure>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
