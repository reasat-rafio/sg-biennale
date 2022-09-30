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
      <div className="flex items-center | space-x-3">
        <div className="flex-1">
          <motion.figure
            initial={{ scale: 1 }}
            animate={{ scale: scroll ? 0.9 : 1 }}
            className="w-fit"
          >
            <Link href="/">
              <motion.a className="max-h-[40px]">
                <SanityImg
                  className="h-full w-full object-contain"
                  image={logo}
                  builder={imageUrlBuilder}
                  width={150}
                  alt="singapore biennale 2022 logo"
                />
              </motion.a>
            </Link>
          </motion.figure>
        </div>

        <div>
          <motion.figure
            className="w-fit"
            initial={{ scale: 1 }}
            animate={{ scale: scroll ? 0.9 : 1 }}
          >
            <Link href="/">
              <a className="max-h-[40px]">
                <SanityImg
                  className="h-full w-full object-contain"
                  image={eventLogo}
                  builder={imageUrlBuilder}
                  width={150}
                  alt="singapore biennale 2022 logo"
                />
              </a>
            </Link>
          </motion.figure>
        </div>
      </div>
    </motion.section>
  );
};
