import { GrCatalog } from "react-icons/gr";

const ExplorePublicationAndCatalogue = {
  name: "explorePage.publicationAndCatalogue",
  title: "Publication And Catalogue",
  type: "object",
  icon: GrCatalog,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publicationsAndCatalogues",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: "reference",
          to: { type: "publicationsCatalogue" },
        },
      ],
    },
  ],
};

export default ExplorePublicationAndCatalogue;
