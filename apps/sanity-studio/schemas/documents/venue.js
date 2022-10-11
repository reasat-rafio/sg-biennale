import { FcInfo, FcReading } from "react-icons/fc";

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
      name: "description",
      type: "array",
      of: [{ type: "block" }],
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
      name: "iformations",
      type: "array",
      validation: (Rule) => Rule.required(),

      of: [
        {
          name: "iformation",
          type: "object",
          icon: FcInfo,
          fields: [
            {
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "infos",
              type: "array",
              validation: (Rule) => Rule.required(),
              of: [
                {
                  name: "info",
                  type: "object",
                  icon: FcInfo,
                  fields: [
                    {
                      name: "type",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "value",
                      type: "array",
                      of: [{ type: "block" }],
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: "type",
                      subtitle: "value",
                    },
                  },
                },
              ],
            },
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
      media: "images.0",
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
