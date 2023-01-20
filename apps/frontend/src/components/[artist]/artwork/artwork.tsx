import useArtistsDetailsStore from "@stores/artist-details.store";
import { ArtworkGallery } from "./gallery/artwork-gallery";
import { motion } from "framer-motion";
import { ArtworkProps } from "@lib/@types/artist-details.types";

export interface ArtworkPageProps {
  name: string;
  artworks: ArtworkProps[];
}

export const Artwork: React.FC<ArtworkPageProps> = ({ name, artworks }) => {
  const { selectedImage } = useArtistsDetailsStore();

  return (
    <section>
      <motion.h5
        initial={{ opacity: 0 }}
        animate={
          selectedImage
            ? { display: "none", opacity: 0 }
            : { display: "block", opacity: 1 }
        }
        className="max-w-[1920px] | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg px-md my-3 | md:text-heading-5 text-heading-6"
      >
        {name}'s Artworks
      </motion.h5>

      <ArtworkGallery artworks={artworks} />
    </section>
  );
};
