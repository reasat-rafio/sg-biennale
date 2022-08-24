import { ISeo, Slug } from "@lib/@types/global.types";
import { SanityImage } from "sanity-react-extra";
import { ArtworkGallery } from "./gallery/artwork-gallery";

interface ArtworkProps {
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
  return (
    <section>
      <h2 className="container my-3">{name}'s Artworks</h2>
      <section className="h-screen">
        <ArtworkGallery artworks={artworks} />
      </section>
    </section>
  );
};
