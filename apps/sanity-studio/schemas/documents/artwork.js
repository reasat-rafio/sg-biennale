import { FcFrame } from "react-icons/fc";

const Artwork = {
  title: "Artwork Details Page",
  name: "artwork",
  type: "document",
  icon: FcFrame,
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
      validation: (Rule) => Rule.required(),
    },

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
      name: "venue",
      type: "reference",
      to: { type: "venue" },
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

export default Artwork;
