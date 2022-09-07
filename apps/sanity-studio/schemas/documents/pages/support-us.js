import { FcCollaboration } from "react-icons/fc";

const SupportUsPage = {
  name: "supportUsPage",
  type: "document",
  icon: FcCollaboration,
  fields: [
    { name: "seo", type: "seo" },

    {
      name: "sections",
      type: "array",
      of: [
        { type: "pageHeading" },
        { type: "supportUs.volunteer" },
        { type: "supportUs.donation" },
        {
          name: "supportUs.decor",
          title: "Decor",
          type: "object",
          fields: [
            {
              name: "image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};

export default SupportUsPage;
