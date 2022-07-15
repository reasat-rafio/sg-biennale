// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import SEO from "./objects/seo";
import CTA from "./objects/cta";
import Info from "./objects/more-info";

import Site from "./documents/site";
import MenuItems from "./objects/site/menu-item";
import Social from "./objects/site/social";
import Footer from "./objects/site/footer";
import Menu from "./objects/menu";

import Venue from "./documents/venue";

import HomePage from "./documents/pages/home";
import HomeHero from "./objects/home/hero";
import HomeHeroCarouselItem from "./objects/home/carousel-item";
import HomeOrganisations from "./objects/home/organisations";
import HomeArtists from "./objects/home/artist";
import HomeNews from "./objects/home/news";

import AboutPage from "./documents/pages/about";
import AboutPageHero from "./objects/about/hero";
import AboutPageAboutUs from "./objects/about/about-us";
import AboutPagePastEditions from "./objects/about/past-edition";

import Event from "./documents/pages/event";
import Category from "./documents/category";

import Artist from "./documents/pages/artist";
import Artwork from "./documents/pages/artwork";

import News from "./documents/news";

import VisitorInfoPage from "./documents/pages/visitor-info";
import visitorInfoHero from "./objects/visitor-info/hero";
import VisitorInfoAdmissionInfo from "./objects/visitor-info/admission/admission-info";
import VisitorInfoAdmission from "./objects/visitor-info/admission/admission";
import VisitorInfoVenues from "./objects/visitor-info/venues";
import AboutPageCuratorialTeam from "./objects/about/curatorial-team";
import AboutPageTeam from "./objects/about/team";
import PressPage from "./documents/pages/press";
import PressRelease from "./objects/press/release";
import PressKitInfo from "./objects/press/kit-info";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    SEO,
    CTA,
    Info,

    Site,
    Menu,
    Footer,
    MenuItems,
    Social,

    Venue,

    HomePage,
    HomeHero,
    HomeHeroCarouselItem,
    HomeOrganisations,
    HomeArtists,
    HomeNews,

    AboutPage,
    AboutPageHero,
    AboutPageAboutUs,
    AboutPagePastEditions,
    AboutPageCuratorialTeam,
    AboutPageTeam,

    PressPage,
    PressRelease,
    PressKitInfo,

    Event,

    Artist,
    Artwork,

    News,

    Category,

    VisitorInfoPage,
    visitorInfoHero,
    VisitorInfoAdmission,
    VisitorInfoAdmissionInfo,
    VisitorInfoVenues,
  ]),
});
