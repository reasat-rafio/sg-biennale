import { imageUrlBuilder } from "@utils/sanity";
import { motion } from "framer-motion";
import { SanityImg, SanityImage } from "sanity-react-extra";

interface ImageProps {
  url: SanityImage;
}

export const Image: React.FC<ImageProps> = ({ url }) => {
  return (
    <motion.figure
      initial={{ scale: 0.9 }}
      whileInView={{
        scale: 1.1,
      }}
      transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
      viewport={{ margin: "-20%" }}
      className="max-h-[700px] overflow-hidden"
    >
      <SanityImg
        className="h-full w-full object-cover "
        width={1080}
        image={url}
        builder={imageUrlBuilder}
      />
    </motion.figure>
  );
};