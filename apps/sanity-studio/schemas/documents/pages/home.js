import { FcHome } from "react-icons/fc";

const HomePage = {
  name: "homePage",
  type: "document",
  title: "Landing",
  icon: FcHome,
  fields: [
    { name: "seo", type: "seo", title: "SEO" },
    {
      name: "sections",
      type: "array",
      of: [
        { type: "homePage.hero" },
        { type: "homePage.organisations" },
        { type: "homePage.promotion" },
        { type: "homePage.news" },
        { type: "homePage.artists" },
      ],
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};

export default HomePage;
