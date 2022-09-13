import { AboutCollection } from "@lib/@types/about.types";
import {
  animationFrameEffect,
  useMeasure,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import useGlobalStore from "@stores/global-store";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Page } from "./page";

interface AboutUsProps {
  type: string;
  aboutCollection: AboutCollection[];
  header: string;
}
const xPhysics = { damping: 50, mass: 0.4, stiffness: 300 };
const transitionY = { type: "tween", duration: 0.5, ease: "easeInOut" };
export const AboutUs: React.FC<AboutUsProps> = ({
  aboutCollection,
  header,
}) => {
  const { navbarHeight, setDisable } = useGlobalStore();
  const viewPortScroll = useScroll();
  const [ref, { width: scrollSceneWidth }] = useMeasure();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const windowHeight = useWindowSize()?.height ?? 0;
  const [scrollY, setScrollY] = useState(0);
  const [_stickyRef, setStikcyRef] = useState<HTMLElement | null>(null);
  const xVal = useTransform(useMotionValue(scrollY), (value) => -value);
  const positionY = useMotionValue(0);
  const x = useSpring(xVal, xPhysics);

  const stickyRef = useCallback(
    (node: HTMLElement) => {
      if (node) setStikcyRef(node);
    },
    [windowWidth]
  );

  const changeScrollDirection = () => {
    if (scrollY - (scrollSceneWidth - windowWidth) > 0) {
      x.set(scrollSceneWidth - windowWidth);
    }
  };

  const onLoadAction = () => {
    if (_stickyRef) {
      const top = _stickyRef.getBoundingClientRect().top ?? 0;
      const y = top + viewPortScroll.scrollY.get();
      if (top <= 0 && y >= _stickyRef?.offsetTop) {
        setDisable(true);
        positionY.set(viewPortScroll.scrollY.get() - _stickyRef?.offsetTop);
      } else {
        setDisable(false);
        positionY.set(0);
      }
    }
  };

  useVisibleScrollEffect(
    sectionRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = Math.max(
          y + windowHeight - offsetBoundingRect.top - windowWidth / 2,
          0
        );
        setScrollY(-yDelta);
      }),
    [windowHeight, windowWidth]
  );

  useEffect(() => {
    x.set(scrollY);
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener("scroll", changeScrollDirection);
    return () => window.removeEventListener("scroll", changeScrollDirection);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onLoadAction);
  }, [_stickyRef]);

  return (
    <motion.section
      ref={stickyRef}
      style={{ y: positionY }}
      transition={transitionY}
      className="bg-white sticky top-0"
    >
      <div
        ref={sectionRef}
        style={{
          height: scrollSceneWidth - windowHeight / 2,
        }}
      >
        <motion.div
          className="inline-flex flex-row"
          ref={ref as any}
          style={{
            x: x,
          }}
        >
          {aboutCollection.map((data) => (
            <Page {...data} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
