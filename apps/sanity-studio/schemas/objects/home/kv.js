const HomeKv = {
  title: "KV",
  name: "homePage.kv",
  type: "object",
  fields: [
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
        },
      ],
    },
    { name: "informatio", type: "homePage.kv.information" },
  ],
  preview: {
    select: {
      media: "kvs.0",
    },
    prepare: ({ media }) => ({
      title: "KV",
      media,
    }),
  },
};

export default HomeKv;
