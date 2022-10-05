import { imageUrlBuilder } from "@utils/sanity";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { SanityImg } from "sanity-react-extra";
import { ArtistProps } from "./artist";

type Screen = "desktop" | "mobile";
interface ArtistCollectionProps {
  artists: ArtistProps[];
  screen?: Screen;
}
interface ArtistCardProps extends ArtistProps {
  screen?: Screen;
}

export const ImageVariants: Variants = {
  initial: {
    scale: 0.7,
  },
  animate: {
    scale: 1.01,
  },
};

export const TextVaiants: Variants = {
  initial: (screen: Screen) => ({
    left: screen === "desktop" ? 20 : 8,
    bottom: screen === "desktop" ? 20 : 8,
    color: "black",
    scale: 1,
  }),
  animate: (screen: Screen) => ({
    left: screen === "desktop" ? 35 : 25,
    bottom: screen === "desktop" ? 35 : 25,
    color: "white",
    scale: 1.2,
    originX: 0.6,
  }),
};

export const ArtistCollection: React.FC<ArtistCollectionProps> = ({
  artists,
  screen = "desktop",
}) => {
  return (
    <motion.section className="lg:col-span-6 col-span-12 grid grid-cols-12 gap-5">
      {artists.map((artist) => (
        <ArtworkCard screen={screen} {...artist} />
      ))}
    </motion.section>
  );
};

export const ArtworkCard: React.FC<ArtistCardProps> = ({ images, name }) => {
  const [hovered, setHoverd] = useState(false);
  const onMouseEnterAction = () => setHoverd(true);
  const onMouseLeaveAction = () => setHoverd(false);
  return (
    <motion.article
      layout
      className="relative col-span-6 aspect-square | bg-white | rounded overflow-hidden cursor-pointer"
      onMouseEnter={onMouseEnterAction}
      onMouseLeave={onMouseLeaveAction}
    >
      <motion.figure
        className="h-full w-full"
        initial="initial"
        animate={hovered ? "animate" : "initial"}
        transition={{
          duration: 2,
          type: "tween",
          ease: [0.075, 0.52, 0.1, 1],
        }}
        variants={ImageVariants}
      >
        <SanityImg
          className="h-full w-full object-cover"
          width={600}
          image={images[0]}
          builder={imageUrlBuilder}
          alt=""
        />
      </motion.figure>

      <motion.h6
        layout
        className="absolute | text-body-2 font-manrope font-semibold"
        animate={hovered ? "animate" : "initial"}
        transition={{
          duration: 0.6,
          type: "tween",
          ease: [0.075, 0.52, 0.1, 1],
        }}
        custom={screen}
        variants={TextVaiants}
      >
        {name}
      </motion.h6>
    </motion.article>
  );
};
