import { FaSitemap } from "react-icons/fa";

const Site = {
  name: "site",
  type: "document",
  title: "Site",
  icon: FaSitemap,
  groups: [{ name: "navigations" }, { name: "footer" }],
  fields: [
    {
      name: "logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "ogImage",
      type: "image",
      title: "Default SEO Image",
      options: {
        accept: "image/png, image/jpeg, image/webp",
      },
    },
    {
      name: "favicon",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    { name: "date", type: "text" },
    {
      name: "navigations",
      type: "menu",
      group: "navigations",
    },
    {
      name: "footer",
      type: "footer",
      group: "footer",
    },
  ],
};

export default Site;
