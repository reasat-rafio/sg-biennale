import { Container } from "@components/ui/container";
import { AboutCollection } from "@lib/@types/about.types";
import {
  animationFrameEffect,
  useIntersection,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import useGlobalStore from "@stores/global-store";
import { motion, useScroll } from "framer-motion";
import React, { useLayoutEffect, useRef, useState } from "react";
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
  const { setDisableSmoothScrolling } = useGlobalStore();
  const viewPortScroll = useScroll();
  const windowHeight = useWindowSize()?.height ?? 0;
  const [scrollYVals, setScrollYVals] = useState<number[]>([0]);
  const stickyRef = useRef<HTMLElement>(null);
  const [scrollYRatio, setScrollYRatio] = useState(0);
  const activePage = Math.floor(scrollYRatio);
  const intersecting = useIntersection(stickyRef, {})?.isIntersecting;

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

  const onScrollAction = () => {
    if (stickyRef?.current) {
      const top = stickyRef?.current?.getBoundingClientRect().top ?? 0;
      const y = top + viewPortScroll.scrollY.get() + 100;

      if (top <= 0 && y > stickyRef.current.offsetTop) {
        setDisableSmoothScrolling(true);
        stickyRef.current.style.transform = `translateY(${
          window.pageYOffset - stickyRef!.current!.offsetTop
        }px)`;
      } else {
        setDisableSmoothScrolling(false);
        stickyRef!.current!.style.transform = `translateY(0)`;
      }
    }
  };

  useLayoutEffect(() => {
    if (intersecting)
      window.addEventListener("scroll", onScrollAction, { passive: true });
    return () => window.removeEventListener("scroll", onScrollAction);
  }, [intersecting]);

  return (
    <motion.section ref={stickyRef} className="bg-white ">
      <div
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
    </motion.section>
  );
};
