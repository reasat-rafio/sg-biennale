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
      validation: (Rule) => Rule.required(),
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
        },
      ],
    },
  ],
};

export default AboutPageCuratorialTeam;
