import { SanityImage } from "sanity-react-extra";
import { Cta, Slug } from "./global.types";

export interface ShortGuide {
  type: string;
  asset: ShortGuideAsset;
  icon: SanityImage;
  title: string;
}

export interface ShortGuideAsset {
  createdAt: Date;
  id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  assetID: string;
  extension: string;
  mimeType: string;
  originalFilename: string;
  path: string;
  sha1Hash: string;
  size: number;
  uploadID: string;
  url: string;
}

export interface MoreInfo {
  key: string;
  type: string;
  cta?: Cta;
  description: string;
  title: string;
  icon?: SanityImage;
  image?: SanityImage;
}

export interface Venue {
  createdAt: Date;
  id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  faqs: FAQ[];
  image: SanityImage;
  location: string;
  name: string;
  slug: Slug;
  timeAndDate: string;
  icon?: SanityImage;
}
export interface FAQ {
  key: string;
  type: string;
  answers: Answer[];
  question: string;
  cta?: Cta;
}

export interface Answer {
  key: string;
  type: string;
  description: string;
  icon: SanityImage;
}

export interface Highlight {
  icon: SanityImage;
  title: string;
}
