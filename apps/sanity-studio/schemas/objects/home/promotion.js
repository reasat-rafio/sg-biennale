import { VscOrganization } from "react-icons/vsc";

const HomePromotion = {
  name: "homePage.promotion",
  type: "object",
  title: "Promotion",
  icon: VscOrganization,

  fields: [
    {
      name: "promotions",
      type: "array",
      of: [
        {
          name: "promotion",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
            },
            { name: "description", type: "text" },
            {
              name: "image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            { name: "cta", type: "cta" },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
            },
          },
        },
      ],
    },
  ],
};

export default HomePromotion;
