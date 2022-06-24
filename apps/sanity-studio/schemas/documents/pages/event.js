import { FcCalendar } from "react-icons/fc";

const Event = {
  title: "Event Page",
  name: "events",
  type: "document",
  icon: FcCalendar,
  fields: [
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
      name: "title",
      type: "string",
    },
    { name: "images", type: "array", of: [{ type: "image" }] },
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
      of: [{ type: "eventPage.info" }],
    },
  ],
};

export default Event;
