import { SiHomeassistant } from "react-icons/si";

const AboutPageAboutSponsors = {
  name: "aboutPage.aboutSponsors",
  title: "About Sponsors",
  type: "object",
  icon: SiHomeassistant,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "sponsorCollection",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "item",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            {
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              type: "image",
              validation: (Rule) => Rule.required(),
              fields: [
                {
                  title: "Alternative Text",
                  name: "alt",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error(
                      "Please add an alternative text for the image"
                    ),
                },
              ],
            },
            {
              name: "description",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "cta",
              type: "cta",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "description",
              media: "image",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "subtitle",
    },
  },
};

export default AboutPageAboutSponsors;
