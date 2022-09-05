import { FcInfo } from "react-icons/fc";

const PressKitInfo = {
  name: "pressPage.kitInfo",
  title: "Kit Info",
  type: "object",
  icon: FcInfo,
  fields: [
    {
      name: "kitInfos",
      type: "array",
      of: [
        {
          type: "object",
          name: "kitInfo",
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
            },
            {
              name: "cta",
              type: "cta",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "infoAndContacts",
              type: "pressPage.kitInfo.infoAndContacts",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "header",
              subtitle: "description",
              media: "image",
            },
          },
        },
      ],
      preview: {
        select: {
          title: "kitInfo[0].title",
        },
        prepare(selection) {
          return {
            title: "Press Kits",
          };
        },
      },
    },
  ],
};

export default PressKitInfo;