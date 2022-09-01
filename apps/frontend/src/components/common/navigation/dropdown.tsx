import { Container } from "@components/ui/container";
import { ISite } from "@lib/@types/global.types";
import {
  ContainerVariants,
  CTAVarinats,
  ImageVariants,
  NevItemVariants,
  RedirectIconVariant,
} from "@lib/helpers/nav-dropdown-helpers";
import useGlobalStore from "@stores/global-store";
import { imageUrlBuilder } from "@utils/sanity";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { SanityImg } from "sanity-react-extra";

export const Dropdown: React.FC<ISite["site"]> = ({
  navigations: { menu },
  footer: { image, social },
}) => {
  const { showNavDropDown } = useGlobalStore();
  const [hoveredIdx, setHoveredIdx] = useState<null | number>(null);

  return (
    <motion.div
      initial="initial"
      animate={showNavDropDown ? "enter" : "exit"}
      variants={ContainerVariants}
      className="z-40 fixed top-0 left-0 | w-screen | backdrop-blur-[60px] bg-white/90 shadow-xl py-14"
    >
      <div className="flex flex-col space-y-4 | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md mx-auto | mt-10">
        <div className="flex-1 | grid grid-cols-12 justify-center items-center">
          <section className="col-span-6 ">
            <ul className="space-y-5">
              {menu.map(({ _key, slug, title }, index) => (
                <motion.li
                  key={_key}
                  className="flex items-center | space-x-3 "
                  initial="initial"
                  animate={showNavDropDown ? "enter" : "exit"}
                  variants={NevItemVariants}
                  custom={index * 0.2}
                  whileHover={{
                    color: "#000000",
                  }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <Link href={`/${slug.current}`}>
                    <a className="text-heading-3 font-medium">{title}</a>
                  </Link>
                  <motion.img
                    initial="initial"
                    animate={hoveredIdx === index ? "enter" : "exit"}
                    variants={RedirectIconVariant}
                    className="w-[24px] h-[24px]"
                    src="/icons/redirect.svg"
                    alt=""
                  />
                </motion.li>
              ))}
            </ul>
          </section>
          <motion.figure
            className="flex flex-col justify-center items-center | col-span-6 | h-[70vh] | overflow-hidden"
            initial="initial"
            animate={showNavDropDown ? "enter" : "exit"}
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
        </div>

        <motion.div
          className="grid grid-cols-12 justify-center items-center"
          initial="initial"
          animate={showNavDropDown ? "enter" : "exit"}
          variants={CTAVarinats}
          custom={0.5 + menu.length * 0.2}
        >
          <div className="col-span-6">
            <button className="border border-black rounded-3xl px-12 py-3 text-xl">
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
      </div>
    </motion.div>
  );
};
