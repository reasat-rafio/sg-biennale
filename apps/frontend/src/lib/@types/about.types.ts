import { SanityImage } from "sanity-react-extra";

export interface TeamCollection {
  _key: string;
  type: string;
  description: string;
  image: SanityImage;
  name: string;
}
