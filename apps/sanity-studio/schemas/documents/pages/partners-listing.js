import { FaHandshake } from "react-icons/fa";
import { SiOpslevel } from "react-icons/si";

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
      name: "partnersAndTiers",
      type: "array",
      of: [
        {
          name: "tier",
          type: "object",
          icon: SiOpslevel,
          fields: [
            {
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },

            {
              name: "partners",
              type: "array",
              validation: (Rule) => Rule.required(),
              of: [
                {
                  name: "partner",
                  type: "object",
                  icon: FaHandshake,
                  fields: [
                    {
                      name: "name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },

                    {
                      name: "href",
                      type: "url",
                    },

                    {
                      name: "image",
                      type: "image",
                      options: { hotspot: true },
                      validation: (Rule) => Rule.required(),
                    },
                    { name: "description", type: "text" },
                  ],
                },
              ],
            },
          ],
        },
      ],
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
