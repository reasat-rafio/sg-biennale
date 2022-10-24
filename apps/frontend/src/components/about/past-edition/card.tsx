import { PastEditionCollection } from "@lib/@types/about.types";
import { useTransformSpring } from "@lib/helpers/animation.helpers";
import { useWindowSize } from "@lib/hooks";
import useAboutStore from "@stores/about.store";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { useMotionValue, motion, transform } from "framer-motion";
import { MouseEvent, useRef, useState } from "react";
import { SanityImg } from "sanity-react-extra";

interface CardProps extends PastEditionCollection {
  index: number;
}
const physics = {
  damping: 30,
  stiffness: 60,
  bounce: 0.1,
  mass: 10,
};
export const Card: React.FC<CardProps> = ({ _id, image, name, url, index }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const windowWidth = useWindowSize()?.width ?? 0;
  const screenX = useMotionValue(0);
  const screenY = useMotionValue(0);
  const rotateValue = useMotionValue(0);
  const { selectedPastEditionId, setSelectedPastEditionId } = useAboutStore();

  const x = useTransformSpring({
    value: screenX,
    outputRange: hovered ? [-50, 50] : [0, 0],
    physics,
  });
  const y = useTransformSpring({
    value: screenY,
    outputRange: hovered ? [-50, 50] : [0, 0],
    physics,
  });
  const rotate = useTransformSpring({
    value: rotateValue,
    outputRange: hovered ? [-10, 10] : [0, 0],
    physics,
  });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const width = transform([0, window.innerWidth], [0, 1])(event.clientX);
    const height = transform([0, window.innerHeight], [0, 1])(event.clientY);
    const rotateX = transform(
      [0, window.innerWidth + window.innerHeight],
      [0, 1]
    )(event.clientX + event.clientY);
    screenX.set(width);
    screenY.set(height);
    rotateValue.set(rotateX);
  };

  return (
    <motion.article
      ref={cardRef}
      className={clsx(
        "xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12 | flex flex-col | space-y-4 p-5 | bg-white | rounded | cursor-pointer",
        selectedPastEditionId === _id && "z-30"
      )}
      transition={{
        delay: index * 0.2,
        type: "tween",
        ease: "easeInOut",
        duration: 0.6,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setHovered(false);
      }}
      onClick={() => setSelectedPastEditionId(_id)}
    >
      <motion.figure
        layoutId={`past-edition-card-image-${_id}`}
        className="max-h-[350px] p-7 overflow-hidden"
        style={{
          x,
          y,
          rotate,
        }}
      >
        <SanityImg
          className="h-full w-full object-cover"
          width={windowWidth >= 1280 ? 300 : windowWidth >= 768 ? 200 : 120}
          image={image}
          builder={imageUrlBuilder}
          alt={image.alt}
        />
      </motion.figure>
      <section>
        <motion.span
          layoutId={`past-edition-card-header-${_id}`}
          className="text-lg font-medium mb-1 font-manrope z-10 relative"
        >
          {name}
        </motion.span>
      </section>
    </motion.article>
  );
};
