const SEO = {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "description",
      type: "string",
    },
    {
      name: "ogImage",
      type: "image",
      options: {
        accept: "image/png, image/jpeg, image/webp",
      },
    },
  ],
};

export default SEO;
