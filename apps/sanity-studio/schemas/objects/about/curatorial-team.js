import { AiOutlineTeam } from "react-icons/ai";

const AboutPageCuratorialTeam = {
  name: "aboutPage.curatorialTeam",
  title: "Curatorial Team",
  type: "object",
  icon: AiOutlineTeam,
  fields: [
    {
      name: "header",
      type: "string",
    },
    {
      name: "teamCollection",
      type: "array",
      of: [
        {
          name: "item",
          type: "object",
          fields: [
            {
              name: "image",
              type: "image",
            },
            { name: "name", type: "string" },
            { name: "description", type: "text" },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "description",
              media: "image",
            },
          },
        },
      ],
    },
  ],
};

export default AboutPageCuratorialTeam;
