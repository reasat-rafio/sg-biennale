import { Container } from "@components/ui/container";
import { useWindowSize } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";

export const ImageGallery: React.FC<{ image: SanityImage }> = ({ image }) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Container className="xl:pt-xxl lg:pt-xl pt-section">
      <motion.figure
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <SanityImg
          className="w-full h-full object-cover"
          image={image}
          builder={imageUrlBuilder}
          alt={image.alt}
          width={windowWidth >= 1280 ? 800 : windowWidth >= 768 ? 400 : 250}
        />
      </motion.figure>
    </Container>
  );
};
