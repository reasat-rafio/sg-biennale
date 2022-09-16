import { Container } from "@components/ui/container";
import { AboutCollection } from "@lib/@types/about.types";
import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import useGlobalStore from "@stores/global-store";
import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Page } from "./page";

interface AboutUsProps {
  type: string;
  aboutCollection: AboutCollection[];
  header: string;
}
const xPhysics = { damping: 50, mass: 0.4, stiffness: 300 };
export const AboutUs: React.FC<AboutUsProps> = ({
  aboutCollection,
  header,
}) => {
  const { setDisableSmoothScrolling } = useGlobalStore();
  const viewPortScroll = useScroll();
  const windowHeight = useWindowSize()?.height ?? 0;
  const windowWidth = useWindowSize()?.width ?? 0;

  const [scrollYVals, setScrollYVals] = useState<number[]>([0]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [_stickyRef, setStikcyRef] = useState<HTMLElement | null>(null);

  const [scrollYRatio, setScrollYRatio] = useState(0);
  const activePage = Math.floor(scrollYRatio);
  const [positionY, setPositionY] = useState(0);

  const stickyRef = useRef<HTMLElement>(null);
  const asd = useRef(0);

  useVisibleScrollEffect(
    sectionRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const scrollYdelta = y + windowHeight - offsetBoundingRect.top;
        const scrollYRatio = Math.max(
          0,
          Math.min(scrollYdelta / windowHeight, aboutCollection.length + 1)
        );
        setScrollYRatio(scrollYRatio);
      }),
    [windowHeight, windowWidth]
  );

  const top = stickyRef?.current?.getBoundingClientRect().top ?? 0;
  const fn = () => {
    if (stickyRef.current) {
      const y = top + viewPortScroll.scrollY.get();
      if (top <= 0 && y >= stickyRef.current.offsetTop) {
        setPositionY(
          viewPortScroll.scrollY.get() - stickyRef.current.offsetTop
        );
      } else {
        setPositionY(0);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.section
      ref={stickyRef}
      style={{ y: `${positionY}px` }}
      className="bg-white sticky top-0"
    >
      <div
        ref={sectionRef}
        style={{
          height: `${aboutCollection.length}50vh`,
        }}
      >
        <motion.div className="relative inline-flex flex-row-reverse">
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
          {aboutCollection.map((data, index) => (
            <Page
              {...data}
              length={aboutCollection.length}
              index={index}
              scrollYRatio={scrollYRatio}
              activePage={activePage}
              setScrollYVals={setScrollYVals}
              scrollYVals={scrollYVals}
            />
          ))}
        </motion.div>
      </div>
      offsetBoundingRect
    </motion.section>
  );
};
