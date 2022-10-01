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
          <div className="lg:hidden flex flex-wrap mb-3">
            {ctas.map(({ href, title, _key, icon }) => (
              <Link href={href} key={_key}>
                <a className="flex space-x-2 items-center last:mr-0 mr-3">
                  <figure className="w-4 h-4">
                    <SanityImg
                      className="h-full w-full object-contain"
                      image={icon}
                      builder={imageUrlBuilder}
                      width={100}
                      alt="icon"
                    />
                  </figure>
                  <span className="sm:text-body-1 text-body-2">{title}</span>
                </a>
              </Link>
            ))}
          </div>
          <div className="flex space-x-5 lg:justify-end">
            <span className="font-manrope lg:text-xl text-base font-semibold">
              Social Media
            </span>
            <div className="flex justify-end space-x-4">
              {social.socials.map(({ _key, icon, url }) => (
                <Link href={url} key={_key}>
                  <a>
                    <figure className="w-6 h-6">
                      <SanityImg
                        className="h-full w-full object-contain"
                        image={icon}
                        builder={imageUrlBuilder}
                        width={100}
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
