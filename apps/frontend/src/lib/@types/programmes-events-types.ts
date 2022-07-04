import { SanityImage } from "sanity-react-extra";
import { Category, Venue } from "./event.types";
import { Slug } from "./global.types";

export interface IPgrammeEvents {
  _id: string;
  category: Category[];
  images: SanityImage[];
  venue: Venue[];
  price: string;
  title: string;
  eventStartDate: Date;
  eventEndDate?: Date;
  eventStartTime: number;
  eventEndTime: number;
  slug: Slug;
}
