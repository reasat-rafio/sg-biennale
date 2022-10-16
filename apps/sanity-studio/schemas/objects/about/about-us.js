import { SiHomeassistant } from "react-icons/si";

const AboutPageAboutUs = {
  name: "aboutPage.about",
  title: "About Us",
  type: "object",
  icon: SiHomeassistant,
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "aboutCollection",
      title: "About",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "item",
          type: "object",
          validation: (Rule) => Rule.required(),
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
            {
              name: "description",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "description",
              media: "image",
            },
          },
        },
      ],
    },
  ],
};

export default AboutPageAboutUs;
