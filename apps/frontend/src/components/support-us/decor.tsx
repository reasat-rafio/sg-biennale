import { imageUrlBuilder } from "@utils/sanity";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion } from "framer-motion";

interface DecorProps {
  image: SanityImage;
}

export const Decor: React.FC<DecorProps> = ({ image }) => {
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
          width={2000}
          builder={imageUrlBuilder}
          alt=""
        />
      </motion.figure>
    </section>
  );
};
