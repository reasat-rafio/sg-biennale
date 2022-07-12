import { GrNote } from "react-icons/gr";

const AboutPagePostEditions = {
  name: "aboutPage.postEdition",
  title: "Post Editions",
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
        },
      ],
    },
  ],
};

export default AboutPagePostEditions;
