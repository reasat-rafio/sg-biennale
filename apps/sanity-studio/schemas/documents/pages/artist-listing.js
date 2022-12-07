import { FcButtingIn } from "react-icons/fc";

const ArtistListing = {
  title: "Artists & Artworks",
  name: "artistListingPage",
  type: "document",
  icon: FcButtingIn,
  fields: [
    {
      name: "seo",
      type: "seo",
    },

    {
      name: "sections",
      type: "array",
      of: [{ type: "pageHeading" }, { type: "moreInfo" }],
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};

export default ArtistListing;
