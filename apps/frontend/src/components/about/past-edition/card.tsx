import { PastEditionCollection } from "@lib/@types/about.types";
import { useTransformSpring } from "@lib/helpers/animation.helpers";
import { imageUrlBuilder } from "@utils/sanity";
import { useMotionValue, motion, transform } from "framer-motion";
import { useRouter } from "next/router";
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
export const Card: React.FC<CardProps> = ({ _key, image, title, url }) => {
  const router = useRouter();
  const cardRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const screenX = useMotionValue(0);
  const screenY = useMotionValue(0);
  const _rotate = useMotionValue(0);

  const x = useTransformSpring({
    value: screenX,
    outputRange: hovered ? [-100, 100] : [0, 0],
    physics,
  });
  const y = useTransformSpring({
    value: screenY,
    outputRange: hovered ? [-150, 150] : [0, 0],
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
    <article
      key={_key}
      ref={cardRef}
      className="flex w-[calc(25%-2%)] flex-col | space-y-4 p-5 | bg-white | rounded | cursor-pointer overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setHovered(false);
      }}
      onClick={() => {
        if (url) router.push(url);
      }}
    >
      <motion.figure
        style={{
          x,
          y,
          rotate,
        }}
        className="max-h-[350px] p-7 overflow-hidden"
      >
        <SanityImg
          width={400}
          image={image}
          builder={imageUrlBuilder}
          className="h-full w-full object-cover"
        />
      </motion.figure>
      <section>
        <h6 className="text-lg font-medium mb-1 font-manrope">{title}</h6>
      </section>
    </article>
  );
};
