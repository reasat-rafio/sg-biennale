import { FcCalendar } from "react-icons/fc";

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
      name: "location",
      type: "string",
    },
    {
      name: "date",
      type: "string",
    },
    {
      name: "time",
      type: "string",
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
      //   subtitle: "location",
      media: "images.0",
    },
  },
};

export default Event;
