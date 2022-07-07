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
    },
    {
      name: "news",
      type: "array",
      of: [{ type: "reference", to: { type: "news" } }],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};

export default HomeNews;
