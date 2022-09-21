import { FaBlogger } from "react-icons/fa";

const ExploreCuratorialEssay = {
  name: "explorePage.curatorialEssay",
  title: "CuratorialEssay",
  type: "object",
  icon: FaBlogger,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "curatorialEssays",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "curatorialEssay",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "author",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
              author: "author",
              url: "url",
              media: "image",
            },
            prepare({ url, media, title, author }) {
              return {
                title,
                subtitle: `${author} | ${url}`,
                media,
              };
            },
          },
        },
      ],
    },
  ],
};

export default ExploreCuratorialEssay;
