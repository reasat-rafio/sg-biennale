import { FcNews } from "react-icons/fc";

const News = {
  title: "News Details Page",
  name: "news",
  type: "document",
  icon: FcNews,
  fields: [
    {
      name: "header",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.header,
      },
    },
    { name: "images", type: "array", of: [{ type: "image" }] },

    {
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "description",
      media: "images.0",
    },
  },
};

export default News;
