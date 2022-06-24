import { FcInfo } from "react-icons/fc";

const Info = {
  title: "Info",
  name: "eventPage.info",
  type: "object",
  icon: FcInfo,
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "description",
      type: "text",
    },
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
  },
};

export default Info;
