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
              fields: [
                {
                  title: "Alternative Text",
                  name: "alt",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error(
                      "Please add an alternative text for the image"
                    ),
                },
              ],
            },
            {
              name: "cta",
              type: "cta",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "infoAndContacts",
              type: "pressPage.kitInfo.infoAndContacts",
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
    },
  ],
  preview: {
    select: {
      title: "",
    },
    prepare: () => ({
      title: "Press Kits",
    }),
  },
};

export default PressKitInfo;
