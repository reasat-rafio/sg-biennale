import { Variants, motion } from "framer-motion";
import { Dispatch, RefObject, SetStateAction } from "react";

interface PlayIconProps {
  setPlay: Dispatch<SetStateAction<boolean>>;
  videoRef: RefObject<HTMLVideoElement>;
  page: number;
}

const PathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export const PlayIcon: React.FC<PlayIconProps> = ({
  setPlay,
  videoRef,
  page,
}) => {
  const playVideoPauseAction = () => {
    if (videoRef.current?.paused) {
      setPlay(true);
      videoRef.current?.play();
    } else {
      setPlay(false);
      videoRef.current?.pause();
    }
  };

  return (
    <motion.svg
      key={page}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | cursor-pointer z-30"
      width="112"
      height="112"
      viewBox="0 0 112 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={playVideoPauseAction}
      initial="hidden"
      animate="visible"
    >
      <motion.path
        key={page}
        variants={PathVariants}
        d="M72.8054 50.0908C74.665 51.3792 74.665 54.1285 72.8054 55.4169L45.2868 74.4823C43.1382 75.9709 40.2021 74.4331 40.2021 71.8193L40.2021 33.6884C40.2021 31.0746 43.1382 29.5368 45.2868 31.0254L72.8054 50.0908Z"
        fill="white"
        custom={0}
      />
      <motion.rect
        key={page}
        variants={PathVariants}
        x="1.73041"
        y="2.13312"
        width="108.43"
        height="108.43"
        rx="54.2149"
        stroke="white"
        strokeWidth="2.42981"
        custom={0}
      />
    </motion.svg>
  );
};
