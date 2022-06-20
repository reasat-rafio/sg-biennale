import { MdLink } from "react-icons/md";

const MenuItems = {
  name: "menuItem",
  title: "Menu Item",
  type: "object",
  icon: MdLink,
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "highlight", type: "boolean" },
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title: `${title}`,
        subtitle: `${slug}`,
      };
    },
  },
};

export default MenuItems;
