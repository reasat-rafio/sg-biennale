import { GrNote } from "react-icons/gr";

const AboutPagePastEditions = {
  name: "aboutPage.pastEdition",
  title: "Past Editions",
  type: "object",
  icon: GrNote,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pastEditionCollection",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "item",
          type: "object",
          fields: [
            {
              name: "image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "description", type: "text" },
            { name: "url", type: "url" },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
            },
          },
        },
      ],
    },
    { name: "cta", type: "cta" },
  ],
};

export default AboutPagePastEditions;
