const VisitorInfoTour = {
  name: "visitorInfoPage.tour",
  title: "Tour",
  type: "object",
  fields: [
    {
      name: "header",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cta",
      type: "cta",
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default VisitorInfoTour;
