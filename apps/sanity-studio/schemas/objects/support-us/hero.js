const SupportUsHero = {
  name: "supportUs.hero",
  title: "Hero",
  type: "object",
  fields: [
    {
      name: "heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tagline",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
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
      title: "heading",
      subtitle: "tagline",
      media: "image",
    },
  },
};

export default SupportUsHero;
