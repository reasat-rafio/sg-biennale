import { SanityImage } from "sanity-react-extra";

export interface ISite {
  site: Site;
}

export interface Site {
  createdAt: Date;
  _id: string;
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
  header: string;
  image: SanityImage;
  menu?: Menu[];
  newsLetter: FooterNewsLetter;
  location: FooterLocation;
  social: FooterSocial;
}

export interface FooterLocation {
  title: string;
  address: string;
}

export interface FooterNewsLetter {
  title: string;
  placeholder: string;
  ctaButton: Cta;
}

export interface FooterSocial {
  title: string;
  socials: Social[];
}

export interface Social {
  _key: string;
  type: string;
  url: string;
  icon: SanityImage;
}

export interface Navigations {
  type: string;
  menu: Menu[];
  heightlights: Heightlight[];
}

export interface Heightlight {
  _key: string;
  _type: string;
  slug: Slug;
  title: string;
  icon: SanityImage;
}

export interface Menu {
  _key: string;
  _type: string;
  slug: Slug;
  title: string;
  highLight?: boolean;
}

export interface Slug {
  type: string;
  current: string;
}

export interface IAccordion {
  _key: string;
  type: string;
  description: string;
  title: string;
}

export interface Cta {
  type: string;
  href: string;
  title: string;
  _key?: string;
}

export interface ISeo {
  title?: string;
  description?: string;
  ogImage: string;
}
