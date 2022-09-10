import { AiOutlineTeam } from "react-icons/ai";

const AboutPageCuratorialTeam = {
  name: "aboutPage.curatorialTeam",
  title: "Curatorial Team",
  type: "object",
  icon: AiOutlineTeam,
  fields: [
    {
      name: "headers",
      type: "array",
      of: [{ name: "header", type: "string" }],
      validation: (Rule) => [Rule.required(), Rule.max(2), Rule.min(2)],
    },
    {
      name: "teamCollection",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "team",
          type: "object",
          fields: [
            {
              name: "team",
              type: "reference",
              to: { type: "curatorial" },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "cardBackgroundGardiants",
              type: "object",
              validation: (Rule) => Rule.required(),
              fields: [
                {
                  name: "from",
                  type: "color",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "to",
                  type: "color",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "team.name",
              subtitle: "team.description",
              media: "team.images.0",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title1: "headers.0",
      title2: "headers.1",
    },
    prepare({ title1, title2 }) {
      return {
        title: `${title1}  ${title2}`,
      };
    },
  },
};

export default AboutPageCuratorialTeam;
