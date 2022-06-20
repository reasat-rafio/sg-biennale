const HomeOrganisations = {
  name: "homePage.organisations",
  type: "object",
  title: "Organisations",
  fields: [
    {
      name: "organisations",
      type: "array",
      of: [
        {
          name: "organisation",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
            },
            { name: "string", type: "string" },
            {
              name: "logo",
              type: "image",
            },
            { name: "url", type: "url", description: "optional" },
          ],
        },
      ],
    },
  ],
};

export default HomeOrganisations;
