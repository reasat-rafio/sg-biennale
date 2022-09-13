import { AboutCollection } from "@lib/@types/about.types";
import { useTransformSpring } from "@lib/helpers/animation.helpers";
import {
  animationFrameEffect,
  useIntersection,
  useMeasure,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import useGlobalStore from "@stores/global-store";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SanityImg } from "sanity-react-extra";

interface AboutUsProps {
  type: string;
  aboutCollection: AboutCollection[];
  header: string;
}
const xPhysics = { damping: 50, mass: 0.4, stiffness: 300 };
const yPhysics = { damping: 50, mass: 0.4, stiffness: 300 };

export const AboutUs: React.FC<AboutUsProps> = ({
  aboutCollection,
  header,
}) => {
  const { navbarHeight, setDisable } = useGlobalStore();
  const viewPortScroll = useViewportScroll();
  const [ref, { width: scrollSceneWidth }] = useMeasure();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const instersecting = useIntersection(sectionRef);
  const windowWidth = useWindowSize()?.width ?? 0;
  const windowHeight = useWindowSize()?.height ?? 0;
  const [scrollY, setScrollY] = useState(0);
  const [_stickyRef, setStikcyRef] = useState<HTMLElement | null>(null);
  const yVal = useMotionValue(0);
  const xVal = useTransform(useMotionValue(scrollY), (value) => -value);
  const x = useSpring(xVal, xPhysics);
  const y = useSpring(yVal, {
    damping: 50,
    // mass: 0.1,
    // stiffness: 50,
    // bounce: 0,
  });
  const controls = useAnimationControls();
  const stickyRef = useCallback(
    (node: HTMLElement) => {
      if (node) setStikcyRef(node);
    },
    [windowWidth]
  );

  // useEffect(() => {
  //   if (instersecting?.isIntersecting) setDisable(true);
  //   else setDisable(false);
  // }, [instersecting?.isIntersecting]);

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

  const changeScrollDirection = () => {
    if (scrollY - (scrollSceneWidth - windowWidth) > 0) {
      x.set(scrollSceneWidth - windowWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeScrollDirection);
    return () => window.removeEventListener("scroll", changeScrollDirection);
  }, []);

  const onLoadAction = () => {
    if (_stickyRef) {
      const top = _stickyRef.getBoundingClientRect().top ?? 0;
      const y = top + viewPortScroll.scrollY.get();
      if (top <= 0 && y >= _stickyRef?.offsetTop) {
        setDisable(true);
        yVal.set(viewPortScroll.scrollY.get() - _stickyRef?.offsetTop);
      } else {
        setDisable(false);
        yVal.set(0);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onLoadAction);
  }, [_stickyRef]);

  return (
    <motion.section
      ref={stickyRef}
      style={{ y: yVal }}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={clsx("bg-black sticky top-0")}
    >
      <motion.div
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
          {aboutCollection.map(({ _key, image }, index) => (
            <motion.div
              // initial={{ scale: 0.9 }}
              // whileInView={{ scale: 1 }}
              key={_key}
              className="h-screen relative basis-[25vw] min-w-[100vw] ml-100vw"
            >
              <div className="h-full overflow-hidden">
                <figure className="absolute h-full w-full top-0">
                  <SanityImg
                    className="h-full w-full object-cover"
                    width={1000}
                    image={image}
                    builder={imageUrlBuilder}
                  />
                </figure>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
