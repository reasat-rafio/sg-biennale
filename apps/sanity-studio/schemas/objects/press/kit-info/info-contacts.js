import { FcInfo } from "react-icons/fc";

const KitinfoAndContacts = {
  name: "pressPage.kitInfo.infoAndContacts",
  title: "Info & Contacts",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
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
};

export default KitinfoAndContacts;
