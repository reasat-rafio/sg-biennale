import { FcNews } from "react-icons/fc";

const PublicationsCatalogue = {
  title: "Publications And Catalogue",
  name: "publicationsCatalogue",
  type: "document",
  icon: FcNews,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      type: "url",
    },
    {
      name: "author",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required(),
    },

    {
      name: "description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    { name: "cta", type: "cta" },
    { name: "file", type: "file" },
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "description",
      media: "images.0",
    },
  },
};

export default PublicationsCatalogue;
