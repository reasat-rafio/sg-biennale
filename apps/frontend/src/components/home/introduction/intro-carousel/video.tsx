import { PlayIcon } from "@components/home/introduction/intro-carousel/play-icon";
import { Video as IVideo } from "@lib/@types/home.types";
import { useIntersection } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { useEffect, useRef, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";

interface VideoProps {
  thumbnail: SanityImage;
  video: IVideo;
}

export const Video: React.FC<VideoProps> = ({ video, thumbnail }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intersecting = useIntersection(videoRef, {
    threshold: 0.1,
  })?.isIntersecting;

  const [play, setPlay] = useState(false);

  //   useEffect(() => {
  //     !intersecting && videoRef?.current?.pause();
  //   }, [intersecting]);

  return (
    <div className="w-full h-full object-cover object-center overflow-hidden">
      {play ? (
        <video
          ref={videoRef}
          width="100%"
          height="100%"
          controls
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
        >
          <source src={video?.webm} type="video/webm" />
          <source src={video?.mp4} type="video/mp4" />
          Sorry, your browser doesn&apos;t support embedded videos.
        </video>
      ) : (
        <div className="relative h-full w-full">
          <PlayIcon setPlay={setPlay} videoRef={videoRef} />
          <SanityImg
            className="w-full h-full object-cover pointer-events-none object-center overflow-hidden"
            draggable={false}
            builder={imageUrlBuilder}
            width={900}
            image={thumbnail}
          />
        </div>
      )}
    </div>
  );
};
