import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { AboutCollection } from "@lib/@types/about.types";
import { useTransformSpring } from "@lib/helpers/animation.helpers";
import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { motion, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { Page } from "./page";

interface AboutUsProps {
  type: string;
  aboutCollection: AboutCollection[];
  header: string;
}

const physics = { damping: 80, mass: 0.4, stiffness: 300 };
export const AboutUs: React.FC<AboutUsProps> = ({
  aboutCollection,
  header,
}) => {
  const stickyRef = useRef<HTMLElement>(null);
  const [scrollYRatio, setScrollYRatio] = useState(0);
  const windowHeight = useWindowSize()?.height ?? 0;
  const [scrollYVals, setScrollYVals] = useState<number[]>([0]);

  const scaleRatio = useMotionValue(0);
  const scale = useTransformSpring({
    value: scaleRatio,
    outputRange: [1, 0.8],
    inputRange: [1, 0],
    physics,
  });

  useVisibleScrollEffect(
    stickyRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const scrollYdelta = y + windowHeight - offsetBoundingRect.top;
        const scrollYRatio = Math.max(
          0,
          Math.min(scrollYdelta / windowHeight, aboutCollection.length + 1)
        );
        scaleRatio.set(scrollYRatio);
        setScrollYRatio(scrollYRatio);
      }),
    [windowHeight]
  );

  return (
    <motion.section
      ref={stickyRef}
      className="overflow-x-clip"
      style={{
        scale,
        height: `${aboutCollection.length * 100 + 50}vh`,
      }}
    >
      <div className="sticky top-0 ">
        <Container className="z-50 relative h-screen ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
            viewport={{ margin: "-200px", once: true }}
            className="absolute lg:max-w-3xl w-full lg:top-1/4 lg:left-0 top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:translate-y-0 | 2xl:pl-max lg:pl-xxl"
          >
            <Header className="text-center lg:text-left">{header}</Header>
          </motion.div>
        </Container>
        <div className="inline-flex  ">
          {aboutCollection.map((data, index) => (
            <Page
              {...data}
              index={index}
              scrollYRatio={scrollYRatio}
              setScrollYVals={setScrollYVals}
              scrollYVals={scrollYVals}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
