import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";
import { useWindowSize } from "@lib/hooks";

interface DecorProps {
  image: SanityImage;
}

export const Decor: React.FC<DecorProps> = ({ image }) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <section className="overflow-hidden mb-x">
      <motion.figure
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.05 }}
        transition={{ duration: 0.6, type: "tween", ease: "easeInOut" }}
        viewport={{ margin: "-30%" }}
        className="lg:h-[210px] h-[150px]"
      >
        <SanityImg
          className="h-full w-full object-cover"
          image={image}
          width={windowWidth >= 1024 ? 1400 : windowWidth >= 768 ? 700 : 400}
          builder={imageUrlBuilder}
          alt={image.alt}
        />
      </motion.figure>
    </section>
  );
};
