import { FooterSocial } from "@lib/@types/global.types";
import useGlobalStore from "@stores/global.store";
import { imageUrlBuilder } from "@utils/sanity";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface SocialsProps {
  social: FooterSocial;
}

export const Varinats: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  enter: () => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 1, type: "tween" },
  }),
  exit: {
    scale: 0.7,
    opacity: 0,
    transition: {
      type: "tween",
    },
  },
};

export const Socials: React.FC<SocialsProps> = ({ social }) => {
  const { showNavDropDown } = useGlobalStore();
  return (
    <AnimatePresence>
      {showNavDropDown && (
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={Varinats}
          className="flex flex-col my-5"
        >
          <div className="space-x-5 lg:justify-end lg:flex hidden">
            <span className="font-manrope lg:text-xl text-base font-semibold">
              Social Media
            </span>
            <div className="flex justify-end space-x-4">
              {social.socials.map(({ _key, icon, url }) => (
                <Link href={url} key={_key} prefetch={false}>
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
