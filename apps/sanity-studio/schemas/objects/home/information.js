import { FcInfo } from "react-icons/fc";

const HomeInformation = {
  title: "Information",
  name: "homePage.kv.information",
  type: "object",
  icon: FcInfo,
  fields: [
    {
      name: "address",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "icon",
          type: "image",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "address",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "socials",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "social",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            {
              name: "name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "icon",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};

export default HomeInformation;
