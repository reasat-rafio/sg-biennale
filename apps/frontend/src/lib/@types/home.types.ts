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
