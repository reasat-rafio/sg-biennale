import { FcAutomatic } from "react-icons/fc";

const Footer = {
  name: "footer",
  type: "object",
  title: "footer",
  icon: FcAutomatic,
  fields: [
    {
      name: "header",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "menu",
      type: "array",
      of: [{ type: "menuItem" }],
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
    {
      name: "newsLetter",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Input field placeholder",
          name: "placeholder",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "ctaButton",
          type: "cta",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "location",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
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
      name: "social",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "socials",
          type: "array",
          of: [{ type: "social" }],
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
};

export default Footer;
