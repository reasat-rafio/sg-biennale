import { YoutubeProps } from "@lib/@types/global.types";
import getYouTubeID from "get-youtube-id";
import YT from "react-youtube";

export const Youtube: React.FC<YoutubeProps> = ({ url }) => {
  const id = getYouTubeID(url as string);
  return (
    <section className="max-w-7xl | mx-auto rounded overflow-hidden">
      <YT
        className="lg:max-h-[600px] aspect-video w-full [&>*]:w-full [&>*]:h-full"
        videoId={id as string}
      />
    </section>
  );
};
