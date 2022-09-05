import { MdOutlineUpdate } from "react-icons/md";

const PressRecentUpdate = {
  name: "pressPage.recentUpdate",
  title: "Recent Update",
  type: "object",
  icon: MdOutlineUpdate,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default PressRecentUpdate;
