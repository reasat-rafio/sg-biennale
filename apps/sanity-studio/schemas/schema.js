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
import Video from "./objects/video";
import PageHeading from "./objects/page-heading";
import YouTube from "./objects/youtube";

import Venue from "./documents/venue";
import PastEdition from "./documents/past-edition";

import HomePage from "./documents/pages/home";
import HomeKv from "./objects/home/kv";
import HomeHero from "./objects/home/hero";
import HomeIntroduction from "./objects/home/introduction";
import HomeOrganisations from "./objects/home/organisations";
import HomeArtists from "./objects/home/artist";
import HomeNews from "./objects/home/news";
import HomeInformation from "./objects/home/information";

import AboutPage from "./documents/pages/about";
import AboutPageHero from "./objects/about/hero";
import AboutPageAboutUs from "./objects/about/about-us";
import AboutPagePastEditions from "./objects/about/past-edition";

import VisitorInfoPage from "./documents/pages/visitor-info";
import visitorInfoHero from "./objects/visitor-info/hero";
import VisitorInfoMap from "./objects/visitor-info/map";
import VisitorInfoAccesibilityInfo from "./objects/visitor-info/accesibility-info";
import VisitorMoreInfo from "./objects/visitor-info/more-info";

import AboutPageCuratorialTeam from "./objects/about/curatorial-team";
import AboutPageTeam from "./objects/about/team";
import PressPage from "./documents/pages/press";
import PressRelease from "./objects/press/release";
import PressKitInfo from "./objects/press/kit-info/kit-info";
import PressRecentUpdate from "./objects/press/recent-update";
import KitinfoAndContacts from "./objects/press/kit-info/info-contacts";

import SupportUsPage from "./documents/pages/support-us";
import SupportUsHero from "./objects/support-us/hero";
import SupportUsDonation from "./objects/support-us/donation";
import SupportUsVolunteer from "./objects/support-us/volunteer";

import ExplorePage from "./documents/pages/explore";
import ExplorePublicationAndCatalogue from "./objects/explore/publication-catalogue";
import ExploreCuratorialEssay from "./objects/explore/curatorial-essay";
import ExploreDirectoryOfTerm from "./objects/explore/directory-of-term";

import Event from "./documents/event";
import Category from "./documents/category";
import EventsListing from "./documents/pages/event-listing";

import Artist from "./documents/artist";
import Artwork from "./documents/artwork";

import ArtistListing from "./documents/pages/artist-listing";

import Curatorial from "./documents/curatorial";

import News from "./documents/news";

import Partner from "./documents/partner";
import Tier from "./documents/tier";

import PartnersListing from "./documents/pages/partners-listing";

import ProgrammesEventsPage from "./documents/pages/programmes-events";
import ProgrammesEventsClosestEvent from "./objects/programmes-events/closest-event";

import PublicationsCatalogue from "./documents/publications-catalogue";
import CuratorialEssay from "./documents/curatorial-essays";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    SEO,
    CTA,
    Info,

    Site,
    Menu,
    YouTube,
    PageHeading,
    Footer,
    MenuItems,
    Social,
    Video,

    Category,

    Venue,
    Event,
    EventsListing,

    PastEdition,

    Artist,
    Artwork,

    ArtistListing,

    Curatorial,

    News,
    PublicationsCatalogue,
    CuratorialEssay,

    HomePage,
    HomeKv,
    HomeHero,
    HomeOrganisations,
    HomeArtists,
    HomeIntroduction,
    HomeNews,
    HomeInformation,

    AboutPage,
    AboutPageHero,
    AboutPageAboutUs,
    AboutPagePastEditions,
    AboutPageCuratorialTeam,
    AboutPageTeam,

    PressPage,
    PressRelease,
    PressKitInfo,
    PressRecentUpdate,
    KitinfoAndContacts,

    VisitorInfoPage,
    visitorInfoHero,
    VisitorInfoMap,
    VisitorMoreInfo,
    VisitorInfoAccesibilityInfo,

    ProgrammesEventsPage,
    ProgrammesEventsClosestEvent,

    Partner,
    Tier,

    PartnersListing,

    SupportUsPage,
    SupportUsHero,
    SupportUsDonation,
    SupportUsVolunteer,

    ExplorePage,
    ExplorePublicationAndCatalogue,
    ExploreCuratorialEssay,
    ExploreDirectoryOfTerm,
  ]),
});
