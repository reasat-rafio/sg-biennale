import { Variants, motion } from "framer-motion";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

interface PlayIconProps {
  play: boolean;
  setPlay: Dispatch<SetStateAction<boolean>>;
  videoRef: RefObject<HTMLVideoElement>;
  page: number;
  hovered: boolean;
}

const PathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
};

export const PlayIcon: React.FC<PlayIconProps> = ({
  setPlay,
  videoRef,
  page,
  play,
  hovered,
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
    <>
      <motion.svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | cursor-pointer z-30 | hover:scale-105 transition-all duration-300"
        key={page}
        initial={false}
        animate={{ opacity: !play ? 1 : hovered ? 1 : 0 }}
        transition={{ type: "tween", ease: "easeInOut" }}
        width="111"
        height="111"
        viewBox="0 0 111 111"
        fill="none"
        onClick={playVideoPauseAction}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          key={page}
          initial="hidden"
          animate={play ? "hidden" : "visible"}
          variants={PathVariants}
          d="M75.7523 49.4946C77.612 50.783 77.612 53.5323 75.7523 54.8207L48.2338 73.8861C46.0852 75.3747 43.149 73.837 43.149 71.2231L43.149 33.0923C43.149 30.4784 46.0852 28.9406 48.2338 30.4292L75.7523 49.4946Z"
          fill="white"
        />
        <motion.path
          key={page}
          initial="hidden"
          animate={play ? "visible" : "hidden"}
          variants={PathVariants}
          d="M42.2 33C43.0487 33 43.8626 33.2224 44.4627 33.6183C45.0629 34.0142 45.4 34.5512 45.4 35.1111V68.8889C45.4 69.4488 45.0629 69.9858 44.4627 70.3817C43.8626 70.7776 43.0487 71 42.2 71C41.3513 71 40.5374 70.7776 39.9373 70.3817C39.3371 69.9858 39 69.4488 39 68.8889V35.1111C39 34.5512 39.3371 34.0142 39.9373 33.6183C40.5374 33.2224 41.3513 33 42.2 33ZM67.8 33C68.6487 33 69.4626 33.2224 70.0627 33.6183C70.6629 34.0142 71 34.5512 71 35.1111V68.8889C71 69.4488 70.6629 69.9858 70.0627 70.3817C69.4626 70.7776 68.6487 71 67.8 71C66.9513 71 66.1374 70.7776 65.5373 70.3817C64.9371 69.9858 64.6 69.4488 64.6 68.8889V35.1111C64.6 34.5512 64.9371 34.0142 65.5373 33.6183C66.1374 33.2224 66.9513 33 67.8 33Z"
          fill="white"
        />
        <motion.rect
          key={page}
          variants={PathVariants}
          initial="hidden"
          animate="visible"
          x="1.2149"
          y="1.2149"
          width="108.43"
          height="108.43"
          rx="54.2149"
          stroke="white"
          stroke-width="2.42981"
        />
      </motion.svg>
    </>
  );
};
