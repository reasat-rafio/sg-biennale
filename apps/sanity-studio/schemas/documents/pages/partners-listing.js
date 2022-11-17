import { FaHandshake } from "react-icons/fa";

const PartnersListing = {
  title: "Partners Listing Page",
  name: "partnerListingPage",
  type: "document",
  icon: FaHandshake,
  fields: [
    {
      name: "seo",
      type: "seo",
    },

    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "greetings",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};

export default PartnersListing;
