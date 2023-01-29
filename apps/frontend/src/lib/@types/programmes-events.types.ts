import { SanityImage } from "sanity-react-extra";
import { Venue } from "./event.types";
import { Cta, Slug } from "./global.types";

export interface IPgrammeEvents {
  _id: string;
  category: AllVenuesProps[];
  images: SanityImage[];
  venue: Venue[];
  price?: number;
  title: string;
  startAt: Date;
  venueNames?: {
    _key: string;
    name: string;
    url?: string;
  }[];
  endAt?: Date;
  description: any;
  additionalInfo?: string;
  slug: Slug;
  relatedArtists: RelatedArtistsProps[];
  cta?: Cta;
  hideCta?: boolean;
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
  _id?: string;
  name: string;
  slug: Slug;
}
export interface Category {
  _id?: string;
  name: string;
  slug: Slug;
}
