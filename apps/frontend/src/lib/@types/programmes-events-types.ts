import { SanityImage } from "sanity-react-extra";
import { Category } from "./event.types";
import { Slug } from "./global.types";

export interface IPgrammeEvents {
  _id: string;
  category: Category[];
  date: string;
  images: SanityImage[];
  location: string;
  price: string;
  title: string;
  time: string;
  slug: Slug;
}
