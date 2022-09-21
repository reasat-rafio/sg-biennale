import { useTransformSpring } from "@lib/helpers/animation.helpers";
import { imageUrlBuilder } from "@utils/sanity";
import { transform, useMotionValue, motion } from "framer-motion";
import { MouseEvent, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";

const physics = {
  damping: 30,
  stiffness: 60,
  bounce: 0.1,
  mass: 10,
};

export interface PublicationsAndCatalogue {
  _key: string;
  _type: string;
  author: string;
  image: SanityImage;
  title: string;
  url: string;
}

export const PublicationCatalogue: React.FC<PublicationsAndCatalogue> = ({
  author,
  image,
  title,
  url,
}) => {
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

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const width = transform([0, window.innerWidth], [0, 1])(event.clientX);
    const height = transform([0, window.innerHeight], [0, 1])(event.clientY);
    const rotateX = transform(
      [0, window.innerWidth + window.innerHeight],
      [0, 1]
    )(event.clientX + event.clientY);

    screenX.set(width);
    screenY.set(height);
    _rotate.set(rotateX);
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setHovered(false);
      }}
      className="grid grid-cols-12 gap-x-8 overflow-visible"
    >
      <div className="col-span-7 | flex flex-col space-y-5">
        <h6 className="text-heading-4 font-medium">{title}</h6>
        <span className="font-bold font-manrope text-gray--400 text-body-1">
          {author}
        </span>
      </div>
      <motion.figure
        className="col-span-5 flex "
        style={{
          x,
          y,
          rotate,
        }}
      >
        <SanityImg
          className=""
          width={400}
          builder={imageUrlBuilder}
          image={image}
          alt={title}
        />
      </motion.figure>
    </motion.article>
  );
};
