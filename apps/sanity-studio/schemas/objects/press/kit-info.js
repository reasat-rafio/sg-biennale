import { FcInfo } from "react-icons/fc";

const PressKitInfo = {
  name: "pressPage.kitInfo",
  title: "Kit Info",
  type: "object",
  icon: FcInfo,
  fields: [
    {
      name: "header",
      type: "string",
    },
    {
      name: "details",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "cta",
          type: "cta",
        },
      ],
    },
    {
      name: "infoAndContacts",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
        },
        { name: "contacts", type: "array", of: [{ type: "block" }] },
      ],
    },
  ],
};

export default PressKitInfo;
