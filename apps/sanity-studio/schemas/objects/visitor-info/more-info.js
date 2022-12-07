import { FaInfoCircle } from "react-icons/fa";

const VisitorMoreInfo = {
  name: "visitorInfoPage.moreInfo",
  title: "More Info",
  type: "object",
  icon: FaInfoCircle,
  fields: [
    {
      name: "moreInfos",
      type: "array",
      of: [
        {
          name: "moreInfo",
          type: "object",
          icon: FaInfoCircle,
          validation: (Rule) => Rule.required(),
          fields: [
            {
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "subtitle",
              type: "string",
            },
            {
              name: "description",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "cta",
              type: "cta",
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
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "image",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: () => ({ title: "More Info" }),
  },
};

export default VisitorMoreInfo;
