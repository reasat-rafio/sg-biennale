import { PastEditionCollection } from "@lib/@types/about.types";
import { useTransformSpring } from "@lib/helpers/animation.helpers";
import { imageUrlBuilder } from "@utils/sanity";
import { useMotionValue, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { SanityImg } from "sanity-react-extra";

interface CardProps extends PastEditionCollection {
  index: number;
}

export const Card: React.FC<CardProps> = ({ _key, image, title, url }) => {
  const router = useRouter();
  const cardRef = useRef<HTMLElement>(null);
  // const [hoverYPosition, setHoverYPosition] = useState(0);
  const scaleValue = useMotionValue(0);
  const scale = useTransformSpring({
    value: scaleValue,
    inputRange: [0, 0.5],
    outputRange: [-20, 20],
  });

  return (
    <article
      key={_key}
      ref={cardRef}
      className="flex w-[calc(25%-2%)] flex-col | space-y-4 p-5 | bg-white | rounded | cursor-pointer "
      onMouseMove={({ clientY }) => {
        if (typeof window !== "undefined") {
          const y = -(clientY / window.innerHeight) * 2 + 1;
          scaleValue.set(y);
        }
      }}
      onClick={() => {
        if (url) router.push(url);
      }}
    >
      <motion.figure
        style={{ translateX: scale }}
        className="max-h-[350px] p-7 overflow-hidden"
      >
        <motion.span className="h-full w-full">
          <SanityImg
            width={400}
            image={image}
            builder={imageUrlBuilder}
            className="h-full w-full object-cover"
          />
        </motion.span>
      </motion.figure>
      <section>
        <h6 className="text-lg font-medium mb-1 font-manrope">{title}</h6>
      </section>
    </article>
  );
};
