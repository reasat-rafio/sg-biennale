import { IArtworkProps } from "@lib/@types/artists.types";
import { imageUrlBuilder } from "@utils/sanity";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { SanityImg } from "sanity-react-extra";

interface ArtworskProps {
  artworks: IArtworkProps[];
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
  initial: {
    left: 20,
    bottom: 20,
    color: "black",
    scale: 1,
  },
  animate: {
    left: 35,
    bottom: 35,
    color: "white",
    scale: 1.2,
    originX: 0.6,
  },
};

export const Artworks: React.FC<ArtworskProps> = ({ artworks }) => {
  return (
    <section className="col-span-6 grid grid-cols-12  gap-5">
      {artworks.map((artwork) => (
        <Card {...artwork} />
      ))}
    </section>
  );
};

const Card: React.FC<IArtworkProps> = ({ _id, images, name }) => {
  const [hovered, setHoverd] = useState(false);
  const onMouseEnterAction = () => setHoverd(true);
  const onMouseLeaveAction = () => setHoverd(false);
  return (
    <motion.article
      className="relative col-span-6 h-[300px] | bg-white | rounded overflow-hidden cursor-pointer"
      onMouseEnter={onMouseEnterAction}
      onMouseLeave={onMouseLeaveAction}
    >
      <motion.figure
        initial="initial"
        animate={hovered ? "animate" : "initial"}
        transition={{
          duration: 2,
          type: "tween",
          ease: [0.075, 0.52, 0.1, 1],
        }}
        variants={ImageVariants}
        className="h-full w-full"
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
        animate={hovered ? "animate" : "initial"}
        transition={{
          duration: 0.6,
          type: "tween",
          ease: [0.075, 0.52, 0.1, 1],
        }}
        variants={TextVaiants}
        className="absolute | text-body-2 font-manrope font-semibold"
      >
        {name}
      </motion.h6>
    </motion.article>
  );
};
