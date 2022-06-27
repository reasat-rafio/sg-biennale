import { FcInfo } from "react-icons/fc";

const Info = {
  title: "Info",
  name: "info",
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
      subtitle: "description",
    },
  },
};

export default Info;
