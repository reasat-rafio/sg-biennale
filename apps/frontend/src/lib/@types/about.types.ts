import { SanityImage } from "sanity-react-extra";
import { Slug } from "./global.types";

export interface TeamCollection {
  _key: string;
  type: string;
  description: string;
  images: SanityImage[];
  name: string;
  slug: Slug;
}

export interface AboutCollection {
  _key: string;
  type: string;
  description: string;
  image: SanityImage;
}

export interface PastEditionCollection {
  _key: string;
  type: string;
  description: string;
  image: SanityImage;
  title: string;
}
