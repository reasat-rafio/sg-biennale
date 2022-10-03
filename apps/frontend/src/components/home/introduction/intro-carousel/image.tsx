import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { SanityImg } from "sanity-react-extra";

interface ImageProps {
  image: string;
}

export const Image: React.FC<ImageProps> = ({ image }) => {
  return (
    <SanityImg
      className="w-full h-full object-cover pointer-events-none object-center overflow-hidden"
      draggable={false}
      builder={imageUrlBuilder}
      width={900}
      image={image}
    />
  );
};
