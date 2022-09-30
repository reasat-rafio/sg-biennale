import { SanityImage } from "sanity-react-extra";
import { Category, Venue } from "./event.types";
import { Slug } from "./global.types";

export interface IPgrammeEvents {
  _id: string;
  category: Category[];
  images: SanityImage[];
  venue: Venue[];
  price?: string;
  title: string;
  startAt: Date;
  endAt?: Date;
  description: any;
  slug: Slug;
  relatedArtists: RelatedArtistsProps[];
}

export interface RelatedArtistsProps {
  _id: string;
  name: string;
}

export interface AllCategoriesProps {
  _id: string;
  name: string;
  slug: Slug;
}

export interface AllVenuesProps {
  _id: string;
  name: string;
  slug: Slug;
}
