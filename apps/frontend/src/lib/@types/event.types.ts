import { SanityImage } from "sanity-react-extra";
import { Slug } from "./global.types";

export interface EventDetailProps {
  _id: string;
  description: any[];
  startAt: Date;
  images: SanityImage[];
  slug: Slug;
  title: string;
  venue: Venue[];
  relatedArtists: RelatedArtistsProps[];
  bookNowUrl?: string;
}

export interface Venue {
  _id: string;
  name: string;
  slug: Slug;
}

export interface RelatedArtistsProps {
  _id: string;
  name: string;
  slug: Slug;
}
