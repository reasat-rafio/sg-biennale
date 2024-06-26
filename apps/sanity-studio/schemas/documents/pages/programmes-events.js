import { FcCalendar } from "react-icons/fc";

const ProgrammesEventsPage = {
  title: "Programmes and Events Page",
  name: "programmesEventsPage",
  icon: FcCalendar,
  type: "document",
  fields: [
    {
      name: "seo",
      type: "seo",
    },
    {
      name: "sections",
      type: "array",
      title: "Sections",
      of: [
        { type: "pageHeading" },
        { type: "programmesEventsPage.closestEvent" },
        { type: "moreInfo" },
      ],
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};

export default ProgrammesEventsPage;
