import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion, Variants } from "framer-motion";
import { imageUrlBuilder } from "@utils/sanity";
import { RelatedArtistsList } from "./related-artists-list";
import { useWindowSize } from "@lib/hooks";

interface FrontSideProps {
  index: number;
  title: string;
  active: boolean;
  images: SanityImage[];
  cardsPerView: number;
  relatedArtists: {
    _id: string;
    name: string;
  }[];
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
  index,
  active,
  cardsPerView,
  title,
  images,
  relatedArtists,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  return (
    <motion.div
      className="absolute h-full bottom-0 | flex flex-col justify-end z-10 cursor-pointer"
      initial="initial"
      animate={active ? "animate" : "inital"}
      variants={AnimationVariants}
      custom={cardsPerView}
      transition={{ duration: 0.6, type: "tween", ease: "easeInOut" }}
    >
      <figure
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.71) 100%)",
        }}
        className="absolute h-full w-full pointer-events-none"
      >
        <SanityImg
          className="h-full w-full object-cover"
          image={images[0]}
          builder={imageUrlBuilder}
          width={windowWidth >= 1280 ? 250 : windowWidth >= 768 ? 200 : 160}
          alt={title}
        />
      </figure>

      <div className="mx-5 mt-20 relative z-20 py-10 space-y-5">
        <motion.h6
          key={String(active)}
          className="w-full | lg:text-2xl text-xl font-medium text-white "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "tween",
            delay: 0.3,
          }}
        >
          {title}
        </motion.h6>
        <RelatedArtistsList index={index} relatedArtists={relatedArtists} />
      </div>
    </motion.div>
  );
};
