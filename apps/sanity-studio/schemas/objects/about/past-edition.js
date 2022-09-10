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
    },
    {
      name: "pastEditionCollection",
      type: "array",
      of: [
        {
          name: "item",
          type: "object",
          fields: [
            { name: "image", type: "image" },
            { name: "title", type: "string" },
            { name: "description", type: "text" },
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
