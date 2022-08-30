import { ISeo, Slug } from "@lib/@types/global.types";
import useArtistsDetailsStore from "@stores/artist-details.store";
import { SanityImage } from "sanity-react-extra";
import { ArtworkGallery } from "./gallery/artwork-gallery";
import { motion } from "framer-motion";

export interface ArtworkProps {
  seo: ISeo;
  name: string;
  slug: Slug;
  images: SanityImage[];
  description: any;
}

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
      <section className="h-[100vh]">
        <ArtworkGallery artworks={artworks} />
      </section>
    </section>
  );
};
