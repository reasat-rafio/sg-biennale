import { FcButtingIn } from "react-icons/fc";

const HomeArtists = {
  name: "homePage.artists",
  type: "object",
  title: "Artists",
  icon: FcButtingIn,
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "artists",
      type: "array",
      of: [{ type: "reference", to: { type: "artist" } }],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};

export default HomeArtists;
