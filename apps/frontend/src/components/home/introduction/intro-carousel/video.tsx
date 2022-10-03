import { PlayIcon } from "@components/home/introduction/intro-carousel/play-icon";
import { Video as IVideo } from "@lib/@types/home.types";
import { useIntersection } from "@lib/hooks";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface VideoProps {
  video: IVideo;
  page: number;
}

export const Video: React.FC<VideoProps> = ({ video, page }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intersecting = useIntersection(videoRef, {
    threshold: 0.1,
  })?.isIntersecting;

  const [play, setPlay] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (intersecting) {
      setPlay(false);
      videoRef?.current?.pause();
    }
  }, [intersecting]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full h-full object-cover object-center overflow-hidden"
    >
      <div className="relative h-full w-full">
        <PlayIcon
          page={page}
          play={play}
          hovered={hovered}
          setPlay={setPlay}
          videoRef={videoRef}
        />
        <video
          className="h-full w-full object-cover introcution-video"
          ref={videoRef}
          width="100%"
          height="100%"
          // controls={play}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
        >
          <source src={video?.webm} type="video/webm" />
          <source src={video?.mp4} type="video/mp4" />
          Sorry, your browser doesn&apos;t support embedded videos.
        </video>
      </div>
    </div>
  );
};
