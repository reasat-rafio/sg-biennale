import { FaHandshake } from "react-icons/fa";

const PartnersListing = {
  title: "Partners Listing Page",
  name: "partnerListingPage",
  type: "document",
  icon: FaHandshake,
  fields: [
    {
      name: "seo",
      type: "seo",
    },

    {
      title: "💡 Call Out",
      name: "callout",
      type: "text",
      //   readOnly: true,
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};

export default PartnersListing;
