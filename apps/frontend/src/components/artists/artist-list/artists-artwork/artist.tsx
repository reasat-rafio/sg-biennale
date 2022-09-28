import { Slug } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

interface ArtistProps {
  name: string;
  slug: Slug;
  images: SanityImage[];
}

export const ImageVariants: Variants = {
  initial: {
    scale: 0.75,
  },
  animate: {
    scale: 1.01,
  },
};

export const TextVaiants: Variants = {
  initial: {
    left: 35,
    bottom: 35,
    color: "black",
    scale: 1,
  },
  animate: {
    left: 50,
    bottom: 50,
    color: "white",
    scale: 1.5,
  },
};

export const Artist: React.FC<ArtistProps> = ({ name, slug, images }) => {
  const [hovered, setHoverd] = useState(false);
  const onMouseEnterAction = () => setHoverd(true);
  const onMouseLeaveAction = () => setHoverd(false);

  return (
    <motion.article
      className="relative col-span-6 | bg-white | rounded overflow-hidden cursor-pointer"
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
