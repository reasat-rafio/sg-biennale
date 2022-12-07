import { SanityImage } from "sanity-react-extra";

export interface PartnerListProps {
  partnersAndTiers: {
    _key: string;
    partners: Partner[];
    title: string;
  }[];
}

export interface Partner {
  _key: string;
  _type: string;
  image: SanityImage;
  name: string;
  href?: string;
}
