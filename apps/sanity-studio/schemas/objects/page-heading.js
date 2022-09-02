import { BsCardHeading } from "react-icons/bs";

const PageHeading = {
  name: "pageHeading",
  type: "object",
  icon: BsCardHeading,
  fields: [
    {
      name: "heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tagline",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "tagline",
    },
  },
};

export default PageHeading;
