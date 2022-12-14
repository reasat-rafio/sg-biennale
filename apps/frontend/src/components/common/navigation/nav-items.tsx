import { HamburgerMenu } from "@components/icons/hamburger-menu";
import { Cta } from "@lib/@types/global.types";
import { useWindowScroll } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavItemsProps {
  ctas: Cta[];
}

export const NavItems: React.FC<NavItemsProps> = ({ ctas }) => {
  const scroll = useWindowScroll()?.y ?? 0;

  return (
    <motion.section
      initial={{ paddingTop: 10.5, paddingBottom: 10.5 }}
      animate={{
        paddingTop: scroll ? 7 : 10.5,
        paddingBottom: scroll ? 7 : 10.5,
      }}
      className="max-w-[1920px] | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md mx-auto | flex items-center relative z-40"
    >
      <div className="flex flex-1 | lg:space-x-4 space-x-2">
        {ctas.map(({ _key, title, href, icon }) => (
          <Link href={href} passHref key={_key} prefetch={false}>
            <motion.a
              whileHover={{
                scale: 1.05,
              }}
              transition={{ damping: 2 }}
              className="hidden lg:flex | space-x-2 items-center cursor-pointer"
            >
              <figure className="w-4 h-4">
                <SanityImg
                  className="h-full w-full object-contain"
                  image={icon}
                  builder={imageUrlBuilder}
                  width={14}
                  alt="icon"
                />
              </figure>
              <span>{title}</span>
            </motion.a>
          </Link>
        ))}
      </div>
      <span>
        <HamburgerMenu />
      </span>
    </motion.section>
  );
};
