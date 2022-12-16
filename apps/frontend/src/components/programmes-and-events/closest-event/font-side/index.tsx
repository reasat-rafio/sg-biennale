import { SanityImage, SanityImg } from "sanity-react-extra";
import { motion, Variants } from "framer-motion";
import { imageUrlBuilder } from "@utils/sanity";
import { RelatedArtistsList } from "./related-artists-list";
import { useWindowSize } from "@lib/hooks";

interface FrontSideProps {
  index: number;
  title: string;
  images: SanityImage[];
  width: number;
  relatedArtists: {
    _id: string;
    name: string;
  }[];
}

export const FrontSide: React.FC<FrontSideProps> = ({
  index,
  title,
  images,
  relatedArtists,
  width,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  return (
    <motion.section
      style={{ width }}
      className="h-full absolute top-0 left-0 z-10 |  flex flex-col justify-end | cursor-pointer"
    >
      <figure className="absolute h-full w-full pointer-events-none">
        <SanityImg
          className="h-full w-full object-cover"
          image={images[0]}
          builder={imageUrlBuilder}
          width={windowWidth >= 1280 ? 250 : windowWidth >= 768 ? 200 : 160}
          alt={title}
        />
        <span
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.71) 100%)",
          }}
          className="absolute w-full h-full top-0 left-0"
        />
      </figure>

      <div className="mx-5 mt-20 relative z-20 py-10 space-y-5">
        <motion.h6
          className="w-full | lg:text-2xl text-xl font-medium text-white "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "tween",
            delay: 0.3,
          }}
        >
          {title}
        </motion.h6>
        {!!relatedArtists?.length && (
          <RelatedArtistsList index={index} relatedArtists={relatedArtists} />
        )}
      </div>
    </motion.section>
  );
};
