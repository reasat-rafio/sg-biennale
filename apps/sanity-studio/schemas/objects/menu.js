import { FcMenu } from "react-icons/fc";

const Menu = {
  name: "menu",
  type: "object",
  title: "Menu",
  icon: FcMenu,
  fields: [
    {
      name: "menu",
      type: "array",
      validation: (Rule) => Rule.required(),
      // Rule.custom((menuItem) => {
      //   const manuItemArr = menuItem.filter((e) => e.highLight);
      //   return manuItemArr.length > 1
      //     ? "Only one navitem allowed to be highlighted"
      //     : true;
      // }),
      of: [{ type: "menuItem" }],
    },

    {
      name: "cta",
      type: "cta",
      description: "will display on the nav dropdown",
    },
  ],
};

export default Menu;
