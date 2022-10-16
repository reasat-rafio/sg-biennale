import { SiApacherocketmq } from "react-icons/si";

const HomeHeroCarouselItem = {
  name: "homePage.hero",
  type: "object",
  title: "Hero",
  icon: SiApacherocketmq,
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
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default HomeHeroCarouselItem;
