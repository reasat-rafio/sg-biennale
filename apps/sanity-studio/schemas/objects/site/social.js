import { IoShareSocial } from "react-icons/io5";

const Social = {
  name: "social",
  title: "Social",
  type: "document",
  icon: IoShareSocial,
  fields: [
    {
      name: "url",
      type: "string",
    },
    { name: "icon", type: "image" },
  ],
  preview: {
    select: {
      title: "url",
      media: "icon",
    },
  },
};

export default Social;
