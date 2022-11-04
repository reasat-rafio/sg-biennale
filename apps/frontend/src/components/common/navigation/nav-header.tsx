import { useWindowScroll } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import Link from "next/link";
import { SanityImg, SanityImage } from "sanity-react-extra";
import { motion } from "framer-motion";

interface NavHeaderProps {
  logo: SanityImage;
  eventLogo: SanityImage;
}

export const NavHeader: React.FC<NavHeaderProps> = ({ logo, eventLogo }) => {
  const scroll = useWindowScroll()?.y ?? 0;
  return (
    <motion.section
      initial={{ paddingTop: 10.5, paddingBottom: 10.5 }}
      animate={{
        paddingTop: scroll ? 7 : 10.5,
        paddingBottom: scroll ? 7 : 10.5,
      }}
      className="relative z-40 | max-w-[1920px] | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md mx-auto"
    >
      <div className="grid grid-cols-2">
        <motion.figure
          initial={{ scale: 1 }}
          animate={{ scale: scroll ? 0.9 : 1 }}
          className="w-fit cursor-pointer"
        >
          <Link href="/">
            <a className="h-full w-full">
              <SanityImg
                className="xl:max-h-[70px] md:max-h-[60px] max-h-[40px] h-full w-full object-contain"
                image={logo}
                builder={imageUrlBuilder}
                width={20}
                alt="singapore biennale 2022 logo"
              />
            </a>
          </Link>
        </motion.figure>

        <motion.figure
          className="w-fit ml-auto"
          initial={{ scale: 1 }}
          animate={{ scale: scroll ? 0.9 : 1 }}
        >
          <Link href="/">
            <a className="h-full w-full">
              <SanityImg
                className="xl:max-h-[70px] md:max-h-[60px] max-h-[40px] h-full w-full object-contain"
                image={eventLogo}
                builder={imageUrlBuilder}
                width={20}
                alt="natasha"
              />
            </a>
          </Link>
        </motion.figure>
      </div>
    </motion.section>
  );
};
