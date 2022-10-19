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

    {
      title: "KV's",
      name: "kvs",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
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
          options: {
            hotspot: true,
          },
        },
      ],
    },
    { name: "randomizeKV", type: "boolean" },
    { name: "date", type: "text" },
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
