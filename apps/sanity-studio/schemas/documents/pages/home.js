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
      title: "Sections",
      of: [{ type: "homePage.hero" }, { type: "homePage.organisations" }],
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
