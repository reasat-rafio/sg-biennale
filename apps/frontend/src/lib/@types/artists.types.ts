import { Slug } from "./global.types";
import { SanityImage } from "sanity-react-extra";

export interface IFilterVenue {
  name: string;
  slug: Slug;
}

export interface IArtworkProps {
  _id: string;
  name: string;
  slug: Slug;
  images: SanityImage[];
}

export interface Tag {
  label: string;
  value: string;
}

export interface ArtistsProps {
  _id: string;
  slug: Slug;
  name: string;
  images: SanityImage[];
  countries: Tag[];
  region: Tag;
}
