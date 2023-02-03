import { FaSitemap } from "react-icons/fa";

const Site = {
  name: "site",
  type: "document",
  title: "Site",
  icon: FaSitemap,
  groups: [{ name: "navigations" }, { name: "footer" }],
  fields: [
    {
      name: "logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ogImage",
      type: "image",
      title: "Default SEO Image",
      options: {
        accept: "image/png, image/jpeg, image/webp",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "favicon",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "eventLogo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },

    { name: "date", type: "text" },
    {
      name: "ticker",
      type: "array",
      description:
        "For link, Enter a valid URL starting with '/' for internal page redirect or 'https://' for external URL",
      of: [
        {
          type: "block",
          validation: (Rule) =>
            Rule.custom((block) => {
              const totalLength = block.children
                .map((c) => c.text)
                .join("").length;

              if (totalLength > 50)
                return "Text is too long (50 character max).";

              return true;
            }),
          lists: [],
          marks: {
            decorators: [],
          },
          styles: [{ title: "Normal", value: "normal" }],
        },
      ],
    },
    {
      name: "navigations",
      type: "menu",
      group: "navigations",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "footer",
      type: "footer",
      group: "footer",
    },
  ],
};

export default Site;
