import { Slug } from "./global.types";
import { SanityImage, SanityImg } from "sanity-react-extra";

export interface IFilterVenue {
  name: string;
  slug: Slug;
}

export interface ArtistsProps {
  _id: string;
  images: SanityImage[];
  name: string;
  countries: {
    label: string;
    value: string;
  }[];
  venues?: IFilterVenue[];
  slug: Slug;
}
