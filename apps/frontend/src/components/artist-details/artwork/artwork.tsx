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
      <motion.h2
        initial={{ opacity: 0 }}
        animate={
          selectedImage
            ? { display: "none", opacity: 0 }
            : { display: "block", opacity: 1 }
        }
        className="container my-3"
      >
        {name}'s Artworks
      </motion.h2>

      <ArtworkGallery artworks={artworks} />
    </section>
  );
};
