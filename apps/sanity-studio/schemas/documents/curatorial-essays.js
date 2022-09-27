import { FcNews } from "react-icons/fc";

const CuratorialEssay = {
  title: "Curatorial Essays",
  name: "curatorialEssay",
  type: "document",
  icon: FcNews,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.header,
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

export default CuratorialEssay;
