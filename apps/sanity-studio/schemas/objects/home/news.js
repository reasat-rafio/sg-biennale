import { FcNews } from "react-icons/fc";

const HomeNews = {
  name: "homePage.news",
  type: "object",
  title: "News",
  icon: FcNews,
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "newsCollection",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "news",
          type: "object",
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
            },
            {
              name: "description",
              type: "array",
              of: [{ type: "block" }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "backgroundColor",
              type: "color",
              validation: (Rule) => Rule.required(),
            },
            { name: "url", type: "url" },
          ],
          preview: {
            select: {
              title: "header",
              subtitle: "description",
              media: "image",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};

export default HomeNews;
