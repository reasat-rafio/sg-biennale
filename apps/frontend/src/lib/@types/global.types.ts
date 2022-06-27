import { SanityImage } from "sanity-react-extra";

export interface ISite {
  site: Site;
}

export interface Site {
  createdAt: Date;
  id: string;
  rev: string;
  type: string;
  updatedAt: Date;
  date: string;
  footer: Footer;
  logo: SanityImage;
  navigations: Navigations;
  ogImage: SanityImage;
}

export interface Footer {
  type: string;
  address: string;
  copyRight: string;
  socials: Social[];
}

export interface Social {
  key: string;
  type: string;
  socialType: string;
  url: string;
}

export interface Navigations {
  type: string;
  menu: Menu[];
}

export interface Menu {
  key: string;
  type: string;
  slug: Slug;
  title: string;
}

export interface Slug {
  type: string;
  current: string;
}

export interface IAccordion {
  key: string;
  type: string;
  description: string;
  title: string;
}
