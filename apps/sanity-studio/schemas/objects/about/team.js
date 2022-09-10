import { HiOutlineUserGroup } from "react-icons/hi";
const AboutPageTeam = {
  name: "aboutPage.team",
  title: "Team",
  type: "object",
  icon: HiOutlineUserGroup,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
  ],
};
export default AboutPageTeam;
