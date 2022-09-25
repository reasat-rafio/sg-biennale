import { SanityImage, SanityImg } from "sanity-react-extra";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { imageUrlBuilder } from "@utils/sanity";

interface FrontSideProps {
  images: SanityImage[];
  title: string;
  active: boolean;
  cardsPerView: number;
  activeCardIndex: number | null;
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
  active,
  cardsPerView,
  title,
  images,
  activeCardIndex,
}) => {
  return (
    <motion.div
      className="absolute h-full bottom-0 | flex flex-col justify-end z-20 cursor-pointer"
      initial="initial"
      animate={active ? "animate" : "inital"}
      variants={AnimationVariants}
      custom={cardsPerView}
      transition={{ duration: 0.6, type: "tween", ease: "easeInOut" }}
    >
      <figure className="absolute h-full w-full pointer-events-none">
        <SanityImg
          className="h-full w-full object-cover"
          image={images[0]}
          builder={imageUrlBuilder}
        />
      </figure>

      <div className="mt-20 relative z-20 py-10">
        <motion.h6
          key={String(active)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "tween",
            delay: 0.3,
          }}
          className="w-full | px-5 | lg:text-2xl text-xl font-medium text-white "
        >
          {title}
        </motion.h6>
      </div>
    </motion.div>
  );
};
