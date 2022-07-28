import { FcCalendar } from "react-icons/fc";

const EventsListing = {
  title: "Event Listing Page",
  name: "eventsListingPage",
  type: "document",
  icon: FcCalendar,
  fields: [
    {
      name: "seo",
      type: "seo",
    },

    {
      title: "💡 Call Out",
      name: "callout",
      type: "text",
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};

export default EventsListing;
