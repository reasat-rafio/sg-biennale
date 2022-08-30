import { FaHandshake } from "react-icons/fa";

const Partner = {
  title: "Partner",
  name: "partner",
  type: "document",
  icon: FaHandshake,
  fields: [
    {
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.name,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "href",
      type: "url",
    },
    {
      name: "tier",
      type: "reference",
      to: { type: "tier" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    { name: "description", type: "text" },
  ],
};

export default Partner;
