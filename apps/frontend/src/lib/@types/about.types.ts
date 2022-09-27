import { SanityImage } from "sanity-react-extra";
import { Hsl, RGB, Slug } from "./global.types";

export interface TeamCollection {
  _key: string;
  _type: string;
  cardBackgroundGardiants: CardBackgroundGardiants;
  team: Team;
}

export interface CardBackgroundGardiants {
  from: From;
  to: From;
}

export interface From {
  _type: string;
  alpha: number;
  hex: string;
  hsl: Hsl;
  hsv: Hsl;
  rgb: RGB;
}

export interface Team {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  description: any;
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
  _id: string;
  type: string;
  description: string;
  url?: string;
  image: SanityImage;
  name: string;
}
