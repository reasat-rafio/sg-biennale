import { FcCalendar } from "react-icons/fc";
import TimeToSecondsField from "sanity-plugin-time-seconds";

const Event = {
  title: "Event Details Page",
  name: "events",
  type: "document",
  icon: FcCalendar,
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.title,
      },
    },
    { name: "images", type: "array", of: [{ type: "image" }] },
    {
      name: "category",
      type: "array",
      options: {
        layout: "category",
        isHighlighted: true,
      },
      of: [
        {
          type: "reference",
          to: { type: "category" },
        },
      ],
    },
    {
      name: "venue",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "venue" },
        },
      ],
    },
    {
      name: "eventStartDate",
      description: "When does the event start?",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "eventEndDate",
      description:
        "When does the event end?\n PS: keep this empty if the event is only a day long",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    },
    {
      name: "eventStartTime",
      title: "Event Start Time",
      type: "number",
      inputComponent: TimeToSecondsField,
      description: "Time in the podcast when ad should start",
      options: {
        placeholder: "Value in 00:00 format",
      },
    },
    {
      name: "eventEndTime",
      title: "Event End Time",
      type: "number",
      inputComponent: TimeToSecondsField,
      description: "Time in the podcast when ad should start",
      options: {
        placeholder: "Value in 00:00 format",
      },
    },
    {
      name: "price",
      type: "string",
    },
    {
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "moreInfo",
      type: "array",
      of: [{ type: "info" }],
    },
  ],
  peview: {
    select: {
      title: "title",
      media: "images.0",
    },
  },
};

export default Event;
