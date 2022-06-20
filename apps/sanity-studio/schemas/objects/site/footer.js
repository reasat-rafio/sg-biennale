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
      name: "date",
      type: "string",
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "socials",
      type: "array",
      of: [{ type: "social" }],
    },
  ],
};

export default Footer;
