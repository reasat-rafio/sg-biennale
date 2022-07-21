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
          name: "team",
          type: "reference",
          to: { type: "curatorial" },
        },
      ],
    },
  ],
};

export default AboutPageCuratorialTeam;
