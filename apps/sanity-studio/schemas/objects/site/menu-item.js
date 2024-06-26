import { MdLink } from "react-icons/md";

const MenuItems = {
  name: "menuItem",
  title: "Menu Item",
  type: "object",
  icon: MdLink,
  fields: [
    { name: "title", type: "string" },
    // {
    //   name: "highLight",
    //   description: "toggle to show to the primary navbar",
    //   type: "boolean",
    // },
    {
      name: "slug",
      type: "slug",
      options: {
        source: (_, options) => options.parent.title,
      },
    },
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
