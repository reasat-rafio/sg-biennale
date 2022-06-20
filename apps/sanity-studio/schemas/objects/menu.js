import { FcMenu } from "react-icons/fc";

const Menu = {
  name: "menu",
  type: "object",
  title: "Menu",
  icon: FcMenu,
  fields: [
    {
      name: "menu",
      title: "Menu",
      type: "array",
      of: [{ type: "menuItem" }],
    },
  ],
};

export default Menu;
