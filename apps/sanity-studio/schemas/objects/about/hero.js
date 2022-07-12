import { SiHomeassistant } from "react-icons/si";

const AboutHero = {
  name: "aboutPage.hero",
  title: "Hero",
  type: "object",
  icon: SiHomeassistant,
  fields: [
    {
      name: "header",
      type: "string",
    },
    {
      name: "subheader",
      type: "string",
    },
    {
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "image",
      type: "image",
    },
    {
      name: "ctas",
      title: "CTA List",
      type: "array",
      of: [{ type: "cta" }],
    },
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "subheader",
      media: "image",
    },
  },
};

export default AboutHero;
