import { AboutCollection } from "@lib/@types/about.types";
import { imageUrlBuilder } from "@utils/sanity";
import { motion } from "framer-motion";
import { SanityImg } from "sanity-react-extra";

export const Page: React.FC<AboutCollection> = ({ _key, image }) => {
  return (
    <motion.div
      key={_key}
      className="h-screen relative basis-[25vw] min-w-[100vw] ml-100vw"
    >
      <div className="h-full overflow-hidden">
        <figure className="absolute h-full w-full top-0">
          <SanityImg
            className="h-full w-full object-cover"
            width={1000}
            image={image}
            builder={imageUrlBuilder}
          />
        </figure>
      </div>
    </motion.div>
  );
};
