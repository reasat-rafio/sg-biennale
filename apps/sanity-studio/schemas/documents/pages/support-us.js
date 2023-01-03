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
        { type: "supportUs.hero" },
        { type: "supportUs.volunteer" },
        { type: "supportUs.donation" },
        { type: "moreInfo" },
        {
          name: "supportUs.decor",
          title: "Decor",
          type: "object",
          fields: [
            {
              name: "image",
              type: "image",
              validation: (Rule) => Rule.required(),
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
              media: "image",
              title: "image.alt",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "seo.title",
      subtitle: "seo.description",
    },
  },
};

export default SupportUsPage;
