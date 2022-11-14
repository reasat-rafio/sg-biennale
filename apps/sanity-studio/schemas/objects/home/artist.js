import { FcButtingIn } from "react-icons/fc";

const HomeArtists = {
  name: "homePage.artists",
  type: "object",
  title: "Highlights",
  icon: FcButtingIn,
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      title: "Highlights",
      name: "artists",
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

export default HomeArtists;
