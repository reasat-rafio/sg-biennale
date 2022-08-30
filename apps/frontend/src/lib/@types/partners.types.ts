import { Slug } from "./global.types";
import { SanityImage } from "sanity-react-extra";

export interface ModifyedPartnersList {
  tierName: string;
  id: string;
  order: number;
  data: PartnerListProps["partners"];
}

export interface PartnerListProps {
  partners: {
    _id: string;
    name: string;
    description?: string;
    image: SanityImage;
    slug: Slug;
    href?: string;
    tier: {
      _id: string;
      title: string;
      order: number;
    };
  }[];
}
