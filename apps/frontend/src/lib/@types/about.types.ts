import { SanityImage } from "sanity-react-extra";

export interface TeamCollection {
  _key: string;
  type: string;
  description: string;
  image: SanityImage;
  name: string;
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
