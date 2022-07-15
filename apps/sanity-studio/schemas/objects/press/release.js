import { FcNews } from "react-icons/fc";

const PressRelease = {
  name: "pressPage.release",
  type: "object",
  icon: FcNews,
  fields: [
    { name: "header", type: "string" },
    {
      name: "releases",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "news" },
        },
      ],
    },
  ],
};

export default PressRelease;
