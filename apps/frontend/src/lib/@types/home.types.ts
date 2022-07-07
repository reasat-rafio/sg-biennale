import { SanityImage } from "sanity-react-extra";

export interface HomHeroProps {
  type: string;
  carousel: Carousel[];
  description: any[];
}

export interface Carousel {
  key: string;
  type: string;
  description: string;
  image: SanityImage;
  title: string;
}

export interface OrganisationProps {
  type: string;
  organisations: Organisation[];
}

export interface Organisation {
  key: string;
  type: string;
  logo: SanityImage;
  name: string;
  title: string;
  url: string;
}

export interface IArtistProps {
  _id: string;
  description: any[];
  images: SanityImage[];
  name: string;
}
