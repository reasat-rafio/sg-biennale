import SmoothScroll from "@components/ui/smooth-scrolling";
import { AboutCollection } from "@lib/@types/about.types";
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
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SanityImg } from "sanity-react-extra";
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
  const { navbarHeight } = useGlobalStore();

  const viewPortScroll = useViewportScroll();
  const [ref, { width: scrollSceneWidth }] = useMeasure();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const windowHeight = useWindowSize()?.height ?? 0;
  const [scrollY, setScrollY] = useState(0);
  const intersecting = useIntersection(sectionRef);
  const [sticky, setSticky] = useState(false);

  const x = useTransform(useMotionValue(scrollY), (value) => -value);

  useVisibleScrollEffect(
    sectionRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        if (offsetBoundingRect.y < viewPortScroll.scrollY.get())
          setSticky(true);
        else setSticky(false);

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

  const [_stickyRef, setStikcyRef] = useState<HTMLElement | null>(null);
  const stickyRef = useCallback(
    (node: HTMLElement) => {
      if (node) setStikcyRef(node);
    },
    [windowWidth]
  );

  const yVal = useMotionValue(0);
  const onLoadAction = () => {
    if (_stickyRef) {
      const top = _stickyRef.getBoundingClientRect().top ?? 0;
      const y = top + viewPortScroll.scrollY.get();

      if (top <= 0 || y > 0) {
        yVal.set(viewPortScroll.scrollY.get() - _stickyRef?.offsetTop);
      }

      console.log("====================================");
      console.log(viewPortScroll.scrollY.get() - _stickyRef?.offsetTop);
      console.log("====================================");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      while (!_stickyRef) {
        onLoadAction();
      }
    });
  }, []);
  return (
    <motion.section
      ref={stickyRef}
      style={{ y: yVal.get() }}
      className={clsx("bg-black sticky top-0")}
    >
      <motion.div
        ref={sectionRef}
        style={{
          // contain: "paint",
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
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
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

{
  /* <Canvas
  scrollPassRatio={scrollPassRatio}
  aboutCollection={aboutCollection}
/> */
}

//  {
//    aboutCollection.map(({ _key, image }) => (
//  <div
//    key={_key}
//    className="h-screen relative basis-[25vw] min-w-[100vw] ml-100vw"
//  >
//    <div className="h-full overflow-hidden">
//      <figure className="absolute h-full w-full top-0">
//        <SanityImg
//          className="h-full w-full object-cover"
//          width={1000}
//          image={image}
//          builder={imageUrlBuilder}
//        />
//      </figure>
//    </div>
//  </div>
//    ));
//  }
