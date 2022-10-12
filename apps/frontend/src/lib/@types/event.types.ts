import { SanityImage } from "sanity-react-extra";
import { IAccordion, Slug } from "./global.types";

export interface EventDetailProps {
  _id: string;
  category: Category[];
  description: any[];
  startAt: Date;
  images: SanityImage[];
  slug: Slug;
  title: string;
  venue: Venue[];
  relatedArtists: RelatedArtistsProps[];
}

export interface EventDescriptionProps {
  className?: string;
  title: string;
  venue: Venue[];
  description: any[];
  price: string;
  moreInfo?: IAccordion[];
  category: Category[];
  eventStartDate: Date;
  eventEndDate?: Date;
  eventStartTime: number;
  eventEndTime: number;
}

export interface Category {
  createdAt: Date;
  _id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  name: string;
  slug: Slug;
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
