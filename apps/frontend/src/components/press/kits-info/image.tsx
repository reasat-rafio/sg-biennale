import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { motion } from "framer-motion";
import { SanityImg, SanityImage } from "sanity-react-extra";

interface ImageProps {
  url: SanityImage;
}

export const Image: React.FC<ImageProps> = ({ url }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  return (
    <motion.figure
      initial={{ scale: 0.9 }}
      whileInView={{
        scale: 1.1,
      }}
      transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
      viewport={{ margin: "-20%" }}
      className="max-h-[700px] w-full overflow-hidden"
    >
      <SanityImg
        className="h-full w-full object-cover "
        width={windowWidth >= 1280 ? 700 : windowWidth >= 768 ? 400 : 250}
        image={url}
        builder={imageUrlBuilder}
        alt={url.alt}
      />
    </motion.figure>
  );
};
