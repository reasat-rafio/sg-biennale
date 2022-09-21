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
          name: "publicationAndCatalogue",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "author",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
              author: "author",
              url: "url",
              media: "image",
            },
            prepare({ url, media, title, author }) {
              return {
                title,
                subtitle: `${author} | ${url}`,
                media,
              };
            },
          },
        },
      ],
    },
  ],
};

export default ExplorePublicationAndCatalogue;
