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
