import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import {
  MotionValue,
  useMotionValue,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface ImageProps {
  image: SanityImage;
  header: string;
}

function useTransformSpring(value: MotionValue, range: [number, number]) {
  const transformValue = useTransform(value, [0, 1], range);
  const springValue = useSpring(transformValue, {
    damping: 30,
    stiffness: 60,
    // bounce: 0.1,
    // mass: 10,
  });
  return springValue;
}

export const Image: React.FC<ImageProps> = ({ image, header }) => {
  const imageRef = useRef<HTMLElement>(null);
  const windowHeight = useWindowSize()?.height ?? 0;
  const windowWidth = useWindowSize()?.width ?? 0;

  const [_scale, setScale] = useState(0);
  const scaleValue = useMotionValue(0);
  const scale = useTransformSpring(scaleValue, [0.5, 1]);

  useVisibleScrollEffect(
    imageRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top;
        const ratio = Math.max(0, Math.min(yDelta / windowHeight));
        const displacement = Math.min(0.5 + Math.min(ratio, 1) * 0.7, 1);
        scale.set(displacement);
        setScale(displacement);
      }),
    [windowHeight, windowWidth]
  );

  return (
    <motion.figure
      style={{ scale }}
      ref={imageRef}
      className="mt-10 | rounded | overflow-hidden max-h-fit"
    >
      <SanityImg
        width={windowWidth >= 768 ? 2000 : 1000}
        className={clsx(
          "w-full h-full object-cover | transition-all duration-500 ease-in-out",
          _scale >= 0.98 ? "scale-100" : "scale-75"
        )}
        image={image}
        builder={imageUrlBuilder}
        alt={`${header}'s image`}
      />
    </motion.figure>
  );
};
