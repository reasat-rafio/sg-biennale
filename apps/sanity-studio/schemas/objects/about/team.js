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
      validation: (Rule) => Rule.required(),
    },
  ],
};
export default AboutPageTeam;
