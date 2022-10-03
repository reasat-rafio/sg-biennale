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
      validation: (Rule) => [Rule.required(), Rule.max(3), Rule.min(3)],
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
              name: "thubmnil",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            { name: "video", type: "video" },
          ],
          preview: {
            select: {
              title: "title",
              media: "thubmnil",
            },
          },
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
