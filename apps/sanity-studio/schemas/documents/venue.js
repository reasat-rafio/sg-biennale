import { FcFaq, FcReading } from "react-icons/fc";

const Venue = {
  name: "venue",
  title: "Venue",
  type: "document",
  icon: FcReading,
  fields: [
    {
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.name,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Start At",
      name: "startAt",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          name: "faq",
          title: "FAQ",
          type: "object",
          icon: FcFaq,
          fields: [
            { name: "question", type: "string" },
            {
              name: "answers",
              type: "array",
              of: [
                {
                  name: "answer",
                  type: "object",
                  fields: [
                    { name: "icon", type: "image", description: "optional" },
                    { name: "description", type: "text" },
                  ],
                  preview: {
                    select: {
                      title: "description",
                      media: "icon",
                    },
                  },
                },
              ],
            },
            { name: "cta", type: "cta" },
          ],
        },
      ],
    },
    {
      title: "Artists",
      name: "artists",
      type: "array",
      of: [{ type: "reference", to: { type: "artist" } }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      startAt: "startAt",
      location: "location",
      media: "image",
    },
    prepare({ title, startAt, location, media }) {
      return {
        title,
        subtitle: `${startAt} || ${location}`,
        media,
      };
    },
  },
};

export default Venue;
