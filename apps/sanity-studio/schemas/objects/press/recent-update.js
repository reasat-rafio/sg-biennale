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
    {
      name: "updates",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: "reference",
          to: { type: "news" },
        },
      ],
    },
  ],
};

export default PressRecentUpdate;
