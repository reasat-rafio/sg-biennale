import { FcNews } from "react-icons/fc";

const PressRelease = {
  name: "pressPage.release",
  title: "Press Release",
  type: "object",
  icon: FcNews,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "releases",
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

export default PressRelease;
