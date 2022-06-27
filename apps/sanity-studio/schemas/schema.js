// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import SEO from "./objects/seo";
import Info from "./objects/more-info";

import Site from "./documents/site";
import MenuItems from "./objects/site/menu-item";
import Social from "./objects/site/social";
import Footer from "./objects/site/footer";
import Menu from "./objects/menu";

import HomePage from "./documents/pages/home";
import HomeHero from "./objects/home/hero";
import HomeHeroCarouselItem from "./objects/home/carousel-item";
import HomeOrganisations from "./objects/home/organisations";

import Event from "./documents/pages/event";
import Category from "./documents/category";

import Artist from "./documents/pages/artist";
import Artwork from "./documents/pages/artwork";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    SEO,
    Info,

    Site,
    Menu,
    Footer,
    MenuItems,
    Social,

    HomePage,
    HomeHero,
    HomeHeroCarouselItem,
    HomeOrganisations,

    Event,

    Artist,
    Artwork,

    Category,
  ]),
});
