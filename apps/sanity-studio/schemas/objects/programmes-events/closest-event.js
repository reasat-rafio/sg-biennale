import { FcCalendar } from "react-icons/fc";

const ClosestEvent = {
  name: "programmesEventsPage.closestEvent",
  title: "Closest Event",
  type: "object",
  icon: FcCalendar,
  fields: [
    { name: "header", type: "string" },
    {
      name: "closestEvents",
      type: "array",
      of: [{ type: "reference", to: [{ type: "events" }] }],
    },
  ],
};

export default ClosestEvent;
