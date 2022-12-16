import { TeamCollection } from "@lib/@types/about.types";
import { motion, Variants } from "framer-motion";
import { SanityImg, SanityImage } from "sanity-react-extra";
import clsx from "clsx";
import { imageUrlBuilder } from "@utils/sanity";

interface FrontSideProps {
  active: boolean;
  name: string;
  bgGradient: TeamCollection["cardBackgroundGardiants"];
  image: SanityImage;
  _key: string;
  width: number;
  windowWidth: number;
}

export const AnimationVariants: Variants = {
  initial: {
    width: "100%",
  },
  animate: (cardsPerView: number) => ({
    width: cardsPerView !== 1 ? ["100%", "50%", "50%"] : "100%",
  }),
};

export const FrontSide: React.FC<FrontSideProps> = ({
  name,
  active,
  bgGradient: { from, to },
  image,
  _key,
  width,
  windowWidth,
}) => {
  return (
    <motion.section
      style={{
        width,
        background: `linear-gradient(180deg, ${from.hex} 0%, ${to.hex} 100%)`,
      }}
      className="h-full absolute top-0 left-0 z-10 |  flex flex-col justify-end"
    >
      <header className="mt-20">
        <motion.h6
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // layoutId={`co-artist-card-header-${_key}`}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "tween",
            delay: 0.3,
          }}
          className="w-full | px-5 | text-center text-white text-heading-5 font-medium "
        >
          {name}
        </motion.h6>
      </header>
      <motion.figure
        className="h-[250px] mt-auto translate-y-[10%]"
        // layoutId={`co-artist-card-image-${_key}`}
      >
        <SanityImg
          className={clsx(
            "pointer-events-none h-full w-full object-contain transition-transform duration-500 ease-in-out",
            active ? "scale-125" : "scale-100"
          )}
          width={windowWidth >= 1280 ? 250 : windowWidth >= 768 ? 200 : 100}
          image={image}
          builder={imageUrlBuilder}
          alt={name}
        />
      </motion.figure>
    </motion.section>
  );
};
