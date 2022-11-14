import { VscOrganization } from "react-icons/vsc";

const HomeOrganisations = {
  name: "homePage.organisations",
  type: "object",
  title: "Organisations",
  icon: VscOrganization,
  fields: [
    {
      name: "organisations",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "organisation",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "logo",
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
              validation: (Rule) => Rule.required(),
            },
            { name: "url", type: "url", description: "optional" },
          ],
          preview: {
            select: {
              title: "title",
              media: "logo",
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "organisations",
      };
    },
  },
};

export default HomeOrganisations;
