import { PastEditionCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import useAboutStore from "@stores/about.store";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useRef } from "react";
import { SanityImg } from "sanity-react-extra";

interface CardProps extends PastEditionCollection {
  index: number;
}

export const Card: React.FC<CardProps> = ({ _id, image, name, url, index }) => {
  const cardRef = useRef<HTMLElement>(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const { selectedPastEditionId, setSelectedPastEditionId } = useAboutStore();

  return (
    <motion.article
      ref={cardRef}
      className={clsx(
        "xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12 | flex flex-col | space-y-4 p-5 | bg-white | rounded | cursor-pointer",
        selectedPastEditionId === _id && "z-30"
      )}
      onClick={() => setSelectedPastEditionId(_id)}
    >
      <motion.figure
        layoutId={`past-edition-card-image-${_id}`}
        className="max-h-[350px] p-7 overflow-hidden"
      >
        <SanityImg
          className="h-full w-full object-cover"
          width={windowWidth >= 1280 ? 300 : windowWidth >= 768 ? 200 : 120}
          image={image}
          builder={imageUrlBuilder}
          alt={image.alt}
        />
      </motion.figure>
      <section>
        <motion.span
          layoutId={`past-edition-card-header-${_id}`}
          className="text-lg font-medium mb-1 font-manrope z-10 relative"
        >
          {name}
        </motion.span>
      </section>
    </motion.article>
  );
};
