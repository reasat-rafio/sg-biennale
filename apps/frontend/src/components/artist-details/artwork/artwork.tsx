import { ISeo, Slug } from "@lib/@types/global.types";
import { SanityImage } from "sanity-react-extra";
interface ArtworkProps {
  seo: ISeo;
  name: string;
  slug: Slug;
  images: SanityImage[];
  description: any;
  moreInfo?: any[];
}

interface ArtworkPageProps {
  name: string;
  artworks: ArtworkProps[];
}

export const Artwork: React.FC<ArtworkPageProps> = ({ name }) => {
  return (
    <section>
      <h2 className="container my-3">{name}'s Artworks</h2>
      
    </section>
  );
};
