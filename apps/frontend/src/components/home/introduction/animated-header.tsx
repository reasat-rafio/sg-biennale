import { motion, useSpring, useTransform } from "framer-motion";
import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import clsx from "clsx";
import { useMotionValue } from "framer-motion";
import { useRef } from "react";

interface AnimatedHeaderProps {
  header: string;
  idx: number;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  header,
  idx,
}) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const windowHeight = useWindowSize()?.height ?? 0;
  const windowWidth = useWindowSize()?.width ?? 0;

  const animatedTo = idx === 2 ? [100, 0] : [-100 * (idx + 1), 0];
  const positionX = useMotionValue(0);

  const x = useTransform(positionX, [0, windowWidth / 4], animatedTo);
  const animatedx = useSpring(x, { damping: 15 });

  useVisibleScrollEffect(
    headerRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top;
        const ratio = Math.max(0, Math.min(yDelta / windowHeight));
        const displacement = ratio * (windowWidth / 4);
        positionX.set(displacement);
      }),
    [windowHeight, windowWidth]
  );

  return (
    <motion.h2
      id={header}
      ref={headerRef}
      style={{ x: animatedx }}
      className={clsx(
        "font-medium text-[112px] leading-tight",
        idx === 0 && "text-left",
        idx === 1 && "text-center",
        idx === 2 && "text-right"
      )}
    >
      {header}
    </motion.h2>
  );
};
