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
      validation: (Rule) =>
        Rule.custom((menuItem) => {
          const manuItemArr = menuItem.filter((e) => e.highLight);
          return manuItemArr.length > 1
            ? "Only one navitem allowed to be highlighted"
            : true;
        }),
      of: [{ type: "menuItem" }],
    },

    // {
    //   name: "heightlights",
    //   type: "array",
    //   of: [
    //     {
    //       name: "heightlight",
    //       type: "object",
    //       fields: [
    //         { name: "title", type: "string" },
    //         {
    //           name: "slug",
    //           type: "slug",
    //           options: {
    //             source: (_, options) => options.parent.title,
    //           },
    //         },
    //         { name: "icon", type: "image" },
    //       ],
    //     },
    //   ],
    // },
  ],
};

export default Menu;
