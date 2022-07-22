import { Slug } from "./global.types";
import { SanityImage } from "sanity-react-extra";

export interface ModifyedPartnersList {
  tierName: string;
  id: string;
  data: PartnerListProps["partners"];
}

export interface PartnerListProps {
  partners: {
    _id: string;
    name: string;
    description: string;
    image: SanityImage;
    slug: Slug;
    tier: {
      _id: string;
      title: string;
    };
  }[];
}
