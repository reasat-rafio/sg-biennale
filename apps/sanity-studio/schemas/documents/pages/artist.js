import { FcManager } from "react-icons/fc";

const Artist = {
  title: "Artist Details Page",
  name: "artist",
  type: "document",
  icon: FcManager,
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.name,
      },
    },
    { name: "images", type: "array", of: [{ type: "image" }] },

    {
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "moreInfo",
      type: "array",
      of: [{ type: "info" }],
    },
  ],
  peview: {
    select: {
      title: "name",
      media: "images.0",
    },
  },
};

export default Artist;
