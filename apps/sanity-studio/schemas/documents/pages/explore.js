import { MdExplore } from "react-icons/md";

const ExplorePage = {
  name: "explorePage",
  title: "Explore",
  type: "document",
  icon: MdExplore,
  fields: [
    { name: "seo", type: "seo" },
    {
      name: "sections",
      type: "array",
      of: [
        { type: "pageHeading" },
        { type: "explorePage.publicationAndCatalogue" },
        { type: "explorePage.curatorialEssay" },
        { type: "explorePage.directoryOfTerm" },
        { type: "moreInfo" },

        // ? adding every other schema type here cause client wants it
        { type: "aboutPage.curatorialTeam" },
        { type: "aboutPage.team" },
        { type: "aboutPage.aboutSponsors" },
        { type: "aboutPage.about" },
        { type: "aboutPage.pastEdition" },
        { type: "homePage.kv" },
        { type: "homePage.introduction" },
        { type: "homePage.organisations" },
        { type: "homePage.news" },
        { type: "homePage.highlight" },
        { type: "pressPage.recentUpdate" },
        { type: "pressPage.release" },
        { type: "pressPage.kitInfo" },
        { type: "programmesEventsPage.closestEvent" },
        { type: "supportUs.volunteer" },
        { type: "supportUs.donation" },
        { type: "visitorInfoPage.imageGallery" },
        { type: "visitorInfoPage.accesibilityInfo" },
        { type: "visitorInfoPage.map" },
      ],
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};

export default ExplorePage;
