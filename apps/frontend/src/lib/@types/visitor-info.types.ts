import { SanityImage } from "sanity-react-extra";

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
