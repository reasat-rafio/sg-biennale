import { TeamCollection } from "@lib/@types/about.types";
import { motion, Variants } from "framer-motion";
import { SanityImg, SanityImage } from "sanity-react-extra";
import clsx from "clsx";
import { imageUrlBuilder } from "@utils/sanity";

interface FrontSideProps {
  active: boolean;
  name: string;
  cardBackgroundGardiants: TeamCollection["cardBackgroundGardiants"];
  image: SanityImage;
  cardsPerView: number;
  id: string;
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
  cardBackgroundGardiants: { from, to },
  image,
  cardsPerView,
  id,
}) => {
  return (
    <motion.div
      className="z-20 absolute h-full bottom-0 | flex flex-col justify-end | cursor-pointer"
      initial="initial"
      animate={active ? "animate" : "inital"}
      variants={AnimationVariants}
      custom={cardsPerView}
      transition={{ duration: 0.6, type: "tween", ease: "easeInOut" }}
      style={{
        background: `linear-gradient(180deg, ${from.hex} 0%, ${to.hex} 100%)`,
      }}
    >
      <header className="mt-20">
        <motion.h6
          key={String(active)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          layoutId={`co-artist-card-header-${id}`}
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
        layoutId={`co-artist-card-image-${id}`}
      >
        <SanityImg
          className={clsx(
            "pointer-events-none h-full w-full object-contain transition-transform duration-500 ease-in-out",
            active ? "scale-125" : "scale-100"
          )}
          image={image}
          builder={imageUrlBuilder}
        />
      </motion.figure>
    </motion.div>
  );
};
