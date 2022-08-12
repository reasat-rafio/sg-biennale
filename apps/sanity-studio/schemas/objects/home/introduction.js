import { FcAbout } from "react-icons/fc";

const HomeIntroduction = {
  title: "Introduction",
  name: "homePage.introduction",
  type: "object",
  icon: FcAbout,
  fields: [
    {
      name: "header",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [{ type: "string" }],
    },
    {
      name: "collection",
      type: "array",
      of: [
        {
          name: "item",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
            },
            {
              name: "image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "video",
              type: "video",
            },
          ],
        },
      ],
    },
    {
      name: "subtitle",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      subtitle: "description",
    },
    prepare({ subtitle }) {
      return {
        title: "Introduction",
        subtitle,
      };
    },
  },
};

export default HomeIntroduction;
