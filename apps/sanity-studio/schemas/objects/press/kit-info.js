import { FcInfo } from "react-icons/fc";

const PressKitInfo = {
  name: "pressPage.kitInfo",
  title: "Kit Info",
  type: "object",
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cta",
      type: "cta",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "infoAndContacts",
      type: "object",
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
                  name: "label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "value",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "value",
                },
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "description",
      media: "image",
    },
  },
};

export default PressKitInfo;
