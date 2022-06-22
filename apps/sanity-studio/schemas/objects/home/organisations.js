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
      of: [
        {
          name: "organisation",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
            },
            { name: "name", type: "string" },
            {
              name: "logo",
              type: "image",
            },
            { name: "url", type: "url", description: "optional" },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "name",
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
