import { FcInfo } from "react-icons/fc";

const VisitorInfoAccesibilityInfo = {
  name: "visitorInfoPage.accesibilityInfo",
  title: "Accesibility Info",
  type: "object",
  icon: FcInfo,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "infos",
      type: "array",
      of: [
        {
          name: "info",
          type: "object",
          icon: FcInfo,
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text" },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
    },

    { name: "cta", type: "cta" },
  ],
};

export default VisitorInfoAccesibilityInfo;
