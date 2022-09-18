import { Container } from "@components/ui/container";
import { AboutCollection } from "@lib/@types/about.types";
import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Page } from "./page";

interface AboutUsProps {
  type: string;
  aboutCollection: AboutCollection[];
  header: string;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  aboutCollection,
  header,
}) => {
  const stickyRef = useRef<HTMLElement>(null);
  const [scrollYRatio, setScrollYRatio] = useState(0);
  const windowHeight = useWindowSize()?.height ?? 0;
  const [scrollYVals, setScrollYVals] = useState<number[]>([0]);

  useVisibleScrollEffect(
    stickyRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const scrollYdelta = y + windowHeight - offsetBoundingRect.top;
        const scrollYRatio = Math.max(
          0,
          Math.min(scrollYdelta / windowHeight, aboutCollection.length + 1)
        );

        setScrollYRatio(scrollYRatio);
      }),
    [windowHeight]
  );

  return (
    <section
      ref={stickyRef}
      className="overflow-x-clip"
      style={{
        height: `${aboutCollection.length * 100 + 50}vh`,
      }}
    >
      <div className="sticky top-0 ">
        <Container className="z-50 relative">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
            viewport={{ margin: "-200px" }}
            className="text-heading-4 font-medium w-[700px] absolute top-40 left-0 xl:pl-max "
          >
            {header}
          </motion.h2>
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
    </section>
  );
};
