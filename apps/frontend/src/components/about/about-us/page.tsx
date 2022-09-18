import { AboutCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { motion, useMotionValue, Variants } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SanityImg } from "sanity-react-extra";
import { useTransformSpring } from "@lib/helpers/animation.helpers";

interface PageProps extends AboutCollection {
  length: number;
  index: number;
  scrollYRatio: number;
  activePage: number;
  scrollYVals: number[];
  setScrollYVals: Dispatch<SetStateAction<number[]>>;
}

const physics = { damping: 80, mass: 0.4, stiffness: 300 };
export const Page: React.FC<PageProps> = ({
  _key,
  image,
  length,
  index,
  scrollYRatio,
  activePage,
  setScrollYVals,
  scrollYVals,
  description,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const [scrollY, setScrollY] = useState(0);
  const scrollByRatio = useMotionValue(0);
  const scaleRatio = useMotionValue(0);

  const x = useTransformSpring({
    value: scrollByRatio,
    outputRange: [0, windowWidth],
    inputRange: [0, 1],
    physics,
  });
  const scale = useTransformSpring({
    value: scaleRatio,
    outputRange: [1, 0.7],
    inputRange: [1, 0],
    physics,
  });

  useEffect(() => {
    const scrollYPosition = index - scrollYRatio + 1;
    scrollByRatio.set(index === 0 ? 0 : scrollYPosition);
    setScrollYVals((prevVals) => {
      prevVals[index] = Math.max(Math.min(scrollYPosition, 1), 0);
      return prevVals;
    });
    const svalue =
      scrollYVals[index + 1] === undefined ? 1 : scrollYVals[index + 1];
    scaleRatio.set(svalue);
    setScrollY(svalue);
  }, [scrollYRatio]);

  return (
    <motion.section
      key={_key}
      ref={sectionRef}
      className="h-screen basis-[25vw] min-w-[100vw] absolute top-0 left-0"
      style={{
        x: x,
        scale,
        originX: 0,
        filter: `grayscale(${100 - scrollY * 100}%)`,
      }}
    >
      <div className="h-full w-full overflow-hidden">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
          viewport={{ margin: "-200px" }}
          className="z-50 absolute w-[40%] top-1/3 right-64 | font-manrope text-body-1"
        >
          {description}
        </motion.p>
        <figure className="absolute h-full w-full top-0">
          <SanityImg
            className="h-full w-full object-cover"
            width={3000}
            image={image}
            builder={imageUrlBuilder}
          />
        </figure>
      </div>
    </motion.section>
  );
};
