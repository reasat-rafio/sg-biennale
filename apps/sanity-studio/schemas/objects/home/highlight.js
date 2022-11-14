import { FcButtingIn } from "react-icons/fc";

const HomeHighlight = {
  name: "homePage.highlight",
  type: "object",
  title: "Highlight",
  icon: FcButtingIn,
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "highlights",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "artist" }, { type: "events" }, { type: "venue" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};

export default HomeHighlight;
