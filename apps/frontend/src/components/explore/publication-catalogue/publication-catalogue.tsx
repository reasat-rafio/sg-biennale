import { Slug } from "@lib/@types/global.types";
import { useTransformSpring } from "@lib/helpers/animation.helpers";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { transform, useMotionValue, motion } from "framer-motion";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";

const physics = {
  damping: 30,
  stiffness: 60,
  bounce: 0.1,
  mass: 10,
};

export interface PublicationsAndCatalogue {
  _id: string;
  header: string;
  slug: Slug;
  author: string;
  images: SanityImage[];
  description: string;
}

export const PublicationCatalogue: React.FC<PublicationsAndCatalogue> = ({
  author,
  images,
  header,
}) => {
  const router = useRouter();
  const windwoWidth = useWindowSize()?.width ?? 0;
  const [hovered, setHovered] = useState(false);
  const screenX = useMotionValue(0);
  const screenY = useMotionValue(0);
  const _rotate = useMotionValue(0);

  const x = useTransformSpring({
    value: screenX,
    outputRange: hovered ? [-50, 50] : [0, 0],
    physics,
  });
  const y = useTransformSpring({
    value: screenY,
    outputRange: hovered ? [-20, 20] : [0, 0],
    physics,
  });
  const rotate = useTransformSpring({
    value: _rotate,
    outputRange: hovered ? [-10, 10] : [0, 0],
    physics,
  });

  // const onTitleClickAction = () => router.push(url);
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const width = transform([0, window.innerWidth], [0, 1])(event.clientX);
    const height = transform([0, window.innerHeight], [0, 1])(event.clientY);
    const rotateX = transform(
      [0, window.innerWidth + window.innerHeight],
      [0, 1]
    )(event.clientX + event.clientY);

    screenX.set(width);
    screenY.set(height);
    _rotate.set(rotateX);
  };

  useEffect(() => {
    if (windwoWidth <= 1024) {
      screenX.set(0);
      screenY.set(0);
      _rotate.set(0);
    }
  }, [windwoWidth]);

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setHovered(false);
      }}
      className="grid grid-cols-12 gap-x-8 overflow-visible lg:h-auto "
    >
      <div className="lg:col-span-7 col-span-12 | flex flex-col space-y-5">
        <h6
          className="lg:text-heading-4 text-heading-5 font-medium | hover:text-red-love cursor-pointer | transition-colors duration-500"
          // onClick={onTitleClickAction}
        >
          {header}
        </h6>
        <span className="font-bold font-manrope text-gray--400 text-body-1">
          {author}
        </span>
      </div>
      <motion.figure
        className="lg:col-span-5 col-span-12 | lg:mt-0 mt-5"
        style={{
          x,
          y,
          rotate,
        }}
      >
        <SanityImg
          className="aspect-video lg:h-auto lg:w-auto  w-full object-cover"
          width={400}
          builder={imageUrlBuilder}
          image={images[0]}
          alt={header}
        />
      </motion.figure>
    </motion.article>
  );
};
