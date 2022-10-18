import { motion } from "framer-motion";
import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import clsx from "clsx";
import { useMotionValue } from "framer-motion";
import { useRef } from "react";
import { useTransformSpring } from "@lib/helpers/animation.helpers";

interface AnimatedHeaderProps {
  header: string;
  idx: number;
  lineLength: number;
  className: string;
}

const physics = { damping: 15 };
export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  className,
  header,
  idx,
  lineLength = 3,
}) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const windowHeight = useWindowSize()?.height ?? 0;
  const windowWidth = useWindowSize()?.width ?? 0;

  const outputRange: [number, number] =
    idx === lineLength - 1 ? [100, 0] : [-200 * (idx + 1), 0];
  const xValue = useMotionValue(0);

  const x = useTransformSpring({
    physics,
    value: xValue,
    outputRange,
    inputRange: [0, windowWidth],
  });

  useVisibleScrollEffect(
    headerRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top;
        const ratio = Math.max(0, Math.min(yDelta / windowHeight));
        xValue.set(ratio * windowWidth);
      }),
    [windowWidth]
  );

  return (
    <>
      {lineLength === 3 && (
        <motion.h2
          ref={headerRef}
          style={{ x }}
          className={clsx(
            className,
            idx === 0 && "text-left",
            idx === 1 && "text-center",
            idx === 2 && "text-right"
          )}
        >
          {header}
        </motion.h2>
      )}
      {lineLength === 2 && (
        <motion.h2
          ref={headerRef}
          style={{ x }}
          className={clsx(
            className,
            idx === 0 && "text-left",
            idx === 1 && "text-right"
          )}
        >
          {header}
        </motion.h2>
      )}
    </>
  );
};
