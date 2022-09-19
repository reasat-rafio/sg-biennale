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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: (doc) => doc.title,
      },
    },
    {
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      validation: (Rule) => Rule.required(),
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "category",
      type: "array",
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
      name: "moreInfo",
      type: "array",
      of: [{ type: "info" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "images.0",
    },
  },
};

export default Event;
