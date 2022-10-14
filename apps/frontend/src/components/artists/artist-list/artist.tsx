import { Slug } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "@lib/hooks";

type Screen = "desktop" | "mobile";
export interface ArtistProps {
  name: string;
  slug: Slug;
  images: SanityImage[];
  screen?: Screen;
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
  initial: (screen: Screen) => ({
    left: screen === "desktop" ? 35 : 10,
    bottom: screen === "desktop" ? 35 : 10,
    color: "black",
    scale: 1,
  }),
  animate: (screen: Screen) => ({
    left: screen === "desktop" ? 50 : 25,
    bottom: screen === "desktop" ? 50 : 25,
    color: "white",
    scale: 1.5,
  }),
};

export const Artist: React.FC<ArtistProps> = ({
  name,
  slug,
  images,
  screen = "desktop",
}) => {
  const router = useRouter();
  const windowWidth = useWindowSize()?.width ?? 0;
  const [hovered, setHoverd] = useState(false);
  const onMouseEnterAction = () => setHoverd(true);
  const onMouseLeaveAction = () => setHoverd(false);
  const onClickAction = () => router.push(`artists/${slug.current}`);

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="relative lg:col-span-6 col-span-12 aspect-square | bg-white | rounded overflow-hidden cursor-pointer"
      onMouseEnter={onMouseEnterAction}
      onMouseLeave={onMouseLeaveAction}
      onClick={onClickAction}
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
          width={windowWidth >= 768 ? 600 : 400}
          image={images[0]}
          builder={imageUrlBuilder}
          alt={name}
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
        custom={screen}
        className="absolute | text-body-2 font-manrope font-semibold"
      >
        {name}
      </motion.h6>
    </motion.article>
  );
};
