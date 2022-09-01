import { FooterSocial } from "@lib/@types/global.types";
import { CTAVarinats } from "@lib/helpers/nav-dropdown-helpers";
import useGlobalStore from "@stores/global-store";
import { imageUrlBuilder } from "@utils/sanity";
import { motion } from "framer-motion";
import Link from "next/link";
import { SanityImg } from "sanity-react-extra";

interface CtaProps {
  menuLength: number;
  social: FooterSocial;
}

export const CTA: React.FC<CtaProps> = ({ menuLength, social }) => {
  const { showNavDropDown } = useGlobalStore();

  return (
    <motion.div
      className="grid grid-cols-12 justify-center items-center"
      initial="initial"
      animate={showNavDropDown ? "enter" : "exit"}
      variants={CTAVarinats}
      custom={0.5 + menuLength * 0.2}
    >
      <div className="col-span-6">
        <button className="border border-black | rounded-3xl px-12 py-3 text-xl">
          Book Ticket Now
        </button>
      </div>
      <div className="col-span-6 | flex justify-center items-center | space-x-9">
        <span className="font-manrope text-body-1">Social Media</span>
        <ul className="flex space-x-5">
          {social.socials.map(({ _key, url, icon }) => (
            <li key={_key}>
              <Link href={url}>
                <a>
                  <SanityImg
                    image={icon}
                    width={24}
                    height={24}
                    builder={imageUrlBuilder}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
