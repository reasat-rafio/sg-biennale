import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import { useTransform, useSpring, motion, useScroll } from "framer-motion";
import useGlobalStore from "@stores/global-store";
React.useLayoutEffect = React.useEffect;

const physics = { damping: 50, mass: 0.4, stiffness: 300 };
const SmoothScroll = ({ children }: { children: any }) => {
  const { disable } = useGlobalStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState<null | number>(null);
  const { scrollY } = useScroll();

  const resizePageHeight = useCallback((entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, []);
  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      resizePageHeight(entries)
    );
    scrollRef && resizeObserver.observe(scrollRef.current as Element);
    return () => resizeObserver.disconnect();
  }, [scrollRef, resizePageHeight]);
  const transform = useTransform(
    scrollY,
    [0, pageHeight ?? 0],
    [0, pageHeight ? -pageHeight : 0]
  );
  const spring = useSpring(transform, physics);

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y: disable ? transform : spring, willChange: "transform" }}
        className="fixed top-0 left-0 w-full overflow-hidden"
      >
        {children}
      </motion.div>

      <div style={{ height: pageHeight ?? 0 }} />
    </>
  );
};

export default SmoothScroll;
