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
      of: [
        {
          type: "block",
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
