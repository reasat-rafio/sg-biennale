import { AboutCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { motion, useMotionValue, Variants } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SanityImg } from "sanity-react-extra";
import { useTransformSpring } from "@lib/helpers/animation.helpers";

interface PageProps extends AboutCollection {
  index: number;
  scrollYRatio: number;
  scrollYVals: number[];
  setScrollYVals: Dispatch<SetStateAction<number[]>>;
}

const physics = { damping: 80, mass: 0.4, stiffness: 300 };
export const Page: React.FC<PageProps> = ({
  _key,
  image,
  index,
  scrollYRatio,
  setScrollYVals,
  scrollYVals,
  description,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const windowHeight = useWindowSize()?.height ?? 0;
  const [scrollY, setScrollY] = useState(0);
  const scrollByRatio = useMotionValue(0);
  const scaleRatio = useMotionValue(0);

  const x = useTransformSpring({
    value: scrollByRatio,
    outputRange: [0, windowWidth],
    inputRange: [0, 1],
    physics,
  });

  const y = useTransformSpring({
    value: scrollByRatio,
    outputRange: [0, windowHeight],
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
      className="h-screen basis-[25vw] w-screen absolute top-0 left-0"
      style={{
        x: windowWidth >= 1024 ? x : 0,
        y: windowWidth >= 1024 ? 0 : y,
        scale,
        originX: windowWidth >= 1024 ? 0 : 0.5,
        filter: `grayscale(${100 - scrollY * 100}%)`,
      }}
    >
      <div className="h-full w-full overflow-hidden">
        <motion.p
          initial={{
            opacity: windowWidth >= 1024 ? 0 : 1,
            y: windowWidth >= 1024 ? 0 : 50,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
          viewport={{ margin: "-200px", once: true }}
          className="z-50 absolute max-w-4xl w-full | 2xl:top-1/4 top-1/2 lg:right-0 right-1/2 | font-manrope text-body-1 text-center lg:text-left | -translate-y-1/2 2xl:translate-y-0 translate-x-1/2 lg:translate-x-0 | 2xl:pr-max lg:pr-xxl px-5"
        >
          {description}
        </motion.p>
        <figure className="absolute h-full w-full top-0 z-0">
          <SanityImg
            className="h-full w-full object-cover"
            height={
              windowWidth >= 1280
                ? 1080
                : windowWidth >= 768
                ? 800
                : windowWidth >= 640
                ? 600
                : 400
            }
            image={image}
            builder={imageUrlBuilder}
            alt={image.alt}
          />
        </figure>
      </div>
    </motion.section>
  );
};
