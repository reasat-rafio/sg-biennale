import { SanityImage } from "sanity-react-extra";
import { Slug } from "./global.types";

export interface RelatedEventsProps {
  _id: string;
  description: any[];
  images: SanityImage[];
  relatedArtists: RelatedArtist[];
  slug: Slug;
  startAt: Date;
  title: string;
  venue: RelatedVenue[];
}

export interface RelatedArtist {
  _id: string;
  name: string;
}
export interface RelatedVenue {
  _id: string;
  slug: Slug;
  name: string;
}
