import { SanityImage } from "sanity-react-extra";
import { Slug } from "./global.types";

export interface EventDetailProps {
  createdAt: Date;
  id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  category: Category[];
  date: string;
  description: any[];
  images: SanityImage[];
  location: string;
  moreInfo?: MoreInfo[];
  price: string;
  slug: Slug;
  time: string;
  title: string;
}

export interface EventDescriptionProps {
  className?: string;
  time: string;
  title: string;
  location: string;
  description: any[];
  date: string;
  price: string;
  moreInfo?: MoreInfo[];
  category: Category[];
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

export interface MoreInfo {
  key: string;
  type: string;
  description: string;
  title: string;
}
