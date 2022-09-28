import { FcButtingIn } from "react-icons/fc";

const ArtistListing = {
  title: "Artist Listing Page",
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
      of: [{ type: "pageHeading" }],
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
