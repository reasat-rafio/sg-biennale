const HomeIntroduction = {
  type: "object",
  name: "homePage.introducion",
  icon: "",
  fields: [
    {
      name: "collection",
      type: "array",
      of: [
        {
          name: "item",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
            },
            {
              name: "image",
              type: "image",
            },
            {
              name: "video",
              type: "video",
            },
          ],
        },
      ],
    },
    {
      name: "description",
      type: "text",
    },
  ],
};

export default HomeIntroduction;
