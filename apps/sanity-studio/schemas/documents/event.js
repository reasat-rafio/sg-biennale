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
      name: "relatedArtists",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: "reference",
          to: { type: "artist" },
        },
      ],
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
      title: "Start At",
      name: "startAt",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },

    {
      title: "End At",
      name: "endAt",
      type: "datetime",
    },

    {
      name: "price",
      type: "number",
      description: "If it's free ignore this field",
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
