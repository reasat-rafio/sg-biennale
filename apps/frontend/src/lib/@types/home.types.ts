import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { SanityImage } from "sanity-react-extra";
import { Cta, ICountry, Slug } from "./global.types";

export interface HomHeroProps {
  type: string;
  image: SanityImage;
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
  _key: string;
  type: string;
  logo: SanityImage;
  name: string;
  title: string;
  url?: string;
}

export interface IArtistProps {
  _id: string;
  description: any[];
  images: SanityImage[];
  name: string;
  slug: Slug;
  artworks: {
    images: SanityImage[];
  }[];
  countries: ICountry[];
}
export interface INewsProps {
  _key: string;
  description: any[];
  image: SanityImage;
  header: string;
  index?: number;
  length?: number;
  backgroundColor: {
    hex: string;
    hsl: any;
    hsv: any;
    rgb: any;
  };
  url?: string;
}

export interface IPromotion {
  _id: string;
  title: string;
  description: string;
  image: SanityImage;
  cta?: Cta;
}

export interface ArtworkImageProps {
  index: number;
  position: any;
  scale: any;
  url: string;
  length: number;
  name: string;
  countries: ICountry[];
  clicked: null | number;
  offsetX: number;
  slug: Slug;
  myTimeout: NodeJS.Timeout | null;
  router: NextRouter;
  scrollPassRatio: number;
  isDown: boolean;
  setClikced: Dispatch<SetStateAction<null | number>>;
}

export interface IntroCarouselProps {
  _key: string;
  _type: string;
  thumbnail: SanityImage;
  title?: string;
  video?: Video;
}

export interface Video {
  mp4?: string;
  webm?: string;
}
