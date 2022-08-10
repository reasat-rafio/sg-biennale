import { FcButtingIn } from "react-icons/fc";
import countries from "../../../../libs/countries";

const Artist = {
  title: "Artist Details Page",
  name: "artist",
  type: "document",
  icon: FcButtingIn,
  fields: [
    {
      name: "seo",
      type: "seo",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.name,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      // validation: (Rule) => Rule.required(),
    },

    {
      name: "description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
