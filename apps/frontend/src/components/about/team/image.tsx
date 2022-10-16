import { useTransformSpring } from "@lib/helpers/animation.helpers";
import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { useMotionValue, motion } from "framer-motion";
import { useRef } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface ImageProps {
  image: SanityImage;
  header: string;
}

const physics = { damping: 30, stiffness: 60 };

export const Image: React.FC<ImageProps> = ({ image, header }) => {
  const imageRef = useRef<HTMLElement>(null);
  const windowHeight = useWindowSize()?.height ?? 0;
  const windowWidth = useWindowSize()?.width ?? 0;

  const scaleValue = useMotionValue(0);
  const scale = useTransformSpring({
    value: scaleValue,
    outputRange: [0.5, 1],
    physics,
  });

  useVisibleScrollEffect(
    imageRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top;
        const ratio = Math.max(0, Math.min(yDelta / windowHeight));
        const displacement = Math.min(0.5 + Math.min(ratio, 1), 1);
        scaleValue.set(displacement);
      }),
    [windowHeight, windowWidth]
  );

  return (
    <motion.figure
      style={{ scale }}
      ref={imageRef}
      className="mt-10 | rounded | overflow-hidden aspect-video"
    >
      <SanityImg
        width={windowWidth >= 1280 ? 1200 : windowWidth >= 768 ? 800 : 400}
        className={clsx(
          "h-full w-full object-cover | transition-all duration-500 ease-in-out"
        )}
        image={image}
        builder={imageUrlBuilder}
        alt={image.alt}
      />
    </motion.figure>
  );
};
