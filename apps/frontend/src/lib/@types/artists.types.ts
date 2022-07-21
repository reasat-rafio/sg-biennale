import { Slug } from "./global.types";
import { SanityImage, SanityImg } from "sanity-react-extra";

export interface ArtistsProps {
  _id: string;
  images: SanityImage[];
  name: string;
  countries: {
    label: string;
    value: string;
  }[];
  slug: Slug;
}
