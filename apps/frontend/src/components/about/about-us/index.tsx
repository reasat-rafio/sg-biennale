import { AboutCollection } from "@lib/@types/about.types";
import {
  animationFrameEffect,
  useIntersection,
  useMeasure,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import { Canvas } from "./canvas";

interface AboutUsProps {
  type: string;
  aboutCollection: AboutCollection[];
  header: string;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  aboutCollection,
  header,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const windowHeight = useWindowSize()?.height ?? 0;
  const [scrollPassRatio, setScrollPassRatio] = useState(0);

  useVisibleScrollEffect(
    sectionRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top - windowWidth;
        const ratio = Math.max(
          0,
          Math.min(yDelta / windowHeight, aboutCollection.length)
        );

        setScrollPassRatio(ratio / aboutCollection.length);
      }),
    [windowHeight]
  );

  return (
    <section className=" relative">
      <motion.div
        ref={sectionRef}
        style={{
          height:
            windowWidth * aboutCollection.length +
            1 -
            windowHeight / 2 +
            windowWidth / 2,
        }}
      >
        <motion.div className=" h-screen sticky top-20">
          <Canvas
            scrollPassRatio={scrollPassRatio}
            aboutCollection={aboutCollection}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
