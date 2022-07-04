import { SanityImage } from "sanity-react-extra";
import { IAccordion, Slug } from "./global.types";

export interface EventDetailProps {
  createdAt: Date;
  id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  category: Category[];
  description: any[];
  eventStartDate: Date;
  eventEndDate?: Date;
  eventStartTime: number;
  eventEndTime: number;
  images: SanityImage[];
  moreInfo?: IAccordion[];
  price: string;
  slug: Slug;
  title: string;
  venue: Venue[];
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
  id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  name: string;
  slug: Slug;
}

export interface Venue {
  name: string;
  slug: Slug;
}
