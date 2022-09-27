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
          type: "reference",
          to: { type: "pastEdition" },
        },
      ],
    },
    { name: "cta", type: "cta" },
  ],
};

export default AboutPagePastEditions;
