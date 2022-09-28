import { Slug } from "./global.types";
import { SanityImage, SanityImg } from "sanity-react-extra";

export interface IFilterVenue {
  name: string;
  slug: Slug;
}

export interface ArtworkProps {
  _id: string;
  name: string;
  slug: Slug;
  images: SanityImage[];
}

export interface ArtistsProps {
  _id: string;
  slug: Slug;
  name: string;
  images: SanityImage[];
  artworks: ArtworkProps[];
  countries: {
    label: string;
    value: string;
  }[];
}
