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
      <div className="grid grid-cols-12 gap-2">
        <figure className="col-span-6 flex">
          <Link href="/" prefetch={false} passHref>
            <motion.a className="xl:h-[70px] md:h-[60px] h-[40px] w-full | flex justify-start">
              <motion.figure
                className="h-full w-fit"
                initial={false}
                animate={{ scale: scroll ? 0.9 : 1, originX: 0 }}
                transition={{ type: "tween" }}
              >
                <SanityImg
                  className="h-full w-fit object-contain"
                  image={logo}
                  builder={imageUrlBuilder}
                  width={20}
                  alt="singapore biennale 2022 logo"
                />
              </motion.figure>
            </motion.a>
          </Link>
        </figure>
        <div className="col-span-6 flex">
          <Link href="/" prefetch={false} passHref>
            <motion.a className="xl:h-[70px] md:h-[60px] h-[40px] w-full | flex justify-end">
              <motion.figure
                className="h-full w-fit"
                initial={false}
                animate={{ scale: scroll ? 0.9 : 1, originX: 1 }}
                transition={{ type: "tween" }}
              >
                <SanityImg
                  className="h-full w-fit object-contain"
                  image={eventLogo}
                  builder={imageUrlBuilder}
                  width={20}
                  alt="natasha"
                />
              </motion.figure>
            </motion.a>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};
