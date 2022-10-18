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
      ],
    },
  ],
};

export default ProgrammesEventsPage;
