import { Dispatch, RefObject, SetStateAction } from "react";

interface PlayIconProps {
  setPlay: Dispatch<SetStateAction<boolean>>;
  videoRef: RefObject<HTMLVideoElement>;
}

export const PlayIcon: React.FC<PlayIconProps> = ({ setPlay, videoRef }) => {
  const playVideoAction = () => {
    setPlay(true);
    videoRef.current?.play();
  };

  return (
    <svg
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | cursor-pointer"
      width="112"
      height="112"
      viewBox="0 0 112 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={playVideoAction}
    >
      <path
        d="M72.8054 50.0908C74.665 51.3792 74.665 54.1285 72.8054 55.4169L45.2868 74.4823C43.1382 75.9709 40.2021 74.4331 40.2021 71.8193L40.2021 33.6884C40.2021 31.0746 43.1382 29.5368 45.2868 31.0254L72.8054 50.0908Z"
        fill="white"
      />
      <rect
        x="1.73041"
        y="2.13312"
        width="108.43"
        height="108.43"
        rx="54.2149"
        stroke="white"
        stroke-width="2.42981"
      />
    </svg>
  );
};
