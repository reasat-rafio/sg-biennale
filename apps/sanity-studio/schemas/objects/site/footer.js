import { FcAutomatic } from "react-icons/fc";

const Footer = {
  name: "footer",
  type: "object",
  title: "footer",
  icon: FcAutomatic,
  fields: [
    {
      name: "copyRight",
      type: "string",
    },

    {
      name: "address",
      type: "text",
    },
    {
      name: "menu",
      type: "array",
      of: [{ type: "menuItem" }],
    },
    {
      name: "socials",
      type: "array",
      of: [{ type: "social" }],
    },
  ],
};

export default Footer;
