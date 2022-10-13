import { SpringValue } from "@react-spring/three";
import { Dispatch, SetStateAction } from "react";
import { SanityImage } from "sanity-react-extra";
import { ISeo, Slug } from "./global.types";

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

export interface ArtworkProps {
  seo: ISeo;
  name: string;
  slug: Slug;
  images: SanityImage[];
  description: any;
  venue?: {
    _id: string;
    name: string;
    slug: Slug;
  };
}

export interface PagesProps {
  artworks: ArtworkProps[][];
  isDown: boolean;
  offsetX: number;
  scrollPassRatio: number;
  pages: number;
  setDown: Dispatch<SetStateAction<boolean>>;
  setScrollPassRatio: Dispatch<SetStateAction<number>>;
}

export interface DimensionsProps {
  aspectRatio: number;
  height: number;
  width: number;
}

export interface PageProps {
  pages: number;
  outterArrIndex: number;
  position: any;
  length: number;
  artworks: ArtworkProps[];
  dimensions: DimensionsProps[];
  isDown: boolean;
  offsetX: number;
  scrollPassRatio: number;
  setDown: Dispatch<SetStateAction<boolean>>;
  setScrollPassRatio: Dispatch<SetStateAction<number>>;
}

export interface ImageProps {
  outterArrIndex: number;
  innerArrIndex: number;
  position: any;
  scale: any;
  url: string;
  artwork: ArtworkProps;
  positionXMin: number;
  isDown: boolean;
  imgEndPoint: number;
  progress: SpringValue<number | null>;
  setDown: Dispatch<SetStateAction<boolean>>;
  setScrollPassRatio: Dispatch<SetStateAction<number>>;
}
