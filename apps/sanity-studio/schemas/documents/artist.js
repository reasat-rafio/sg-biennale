import { FcButtingIn } from "react-icons/fc";
import countries from "../../../../libs/countries";

const Artist = {
  title: "Artist Details Page",
  name: "artist",
  type: "document",
  icon: FcButtingIn,
  fields: [
    { name: "seo", type: "seo" },
    {
      name: "name",
      type: "string",
    },
    {
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
    {
      name: "artworks",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "artwork" },
        },
      ],
    },

    {
      name: "countries",
      type: "tags",
      options: {
        predefinedTags: [...countries],
        allowCreate: false,
      },
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "images.0",
    },
  },
};

export default Artist;
