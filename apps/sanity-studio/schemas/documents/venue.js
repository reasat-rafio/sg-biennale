import { FcFaq, FcReading } from "react-icons/fc";

const Venue = {
  name: "venue",
  title: "Venue",
  type: "document",
  icon: FcReading,
  fields: [
    { name: "name", type: "string" },
    {
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => doc.name,
      },
    },
    { name: "image", type: "image", options: { hotspot: true } },
    { name: "icon", type: "image" },
    { name: "location", type: "string" },
    { name: "timeAndDate", type: "string" },
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
  ],
  preview: {
    select: {
      title: "name",
      timeAndDate: "timeAndDate",
      location: "location",
      media: "image",
    },
    prepare({ title, timeAndDate, location, media }) {
      return {
        title,
        subtitle: `${timeAndDate} || ${location}`,
        media,
      };
    },
  },
};

export default Venue;
