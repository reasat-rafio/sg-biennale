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
    },
    {
      name: "aboutCollection",
      title: "About",
      type: "array",
      of: [
        {
          name: "item",
          type: "object",
          fields: [
            { name: "image", type: "image" },
            { name: "description", type: "text" },
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
