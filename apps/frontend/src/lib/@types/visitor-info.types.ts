import { SanityImage } from "sanity-react-extra";
import { Cta } from "./global.types";

export interface ShortGuide {
  type: string;
  asset: ShortGuideAsset;
  icon: SanityImage;
  title: string;
}

export interface ShortGuideAsset {
  createdAt: Date;
  id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  assetID: string;
  extension: string;
  mimeType: string;
  originalFilename: string;
  path: string;
  sha1Hash: string;
  size: number;
  uploadID: string;
  url: string;
}

export interface MoreInfo {
  key: string;
  type: string;
  cta: Cta;
  description: string;
  title: string;
  icon?: SanityImage;
}
