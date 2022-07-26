import { FcBusiness } from "react-icons/fc";

const HomePromotion = {
  name: "homePage.promotion",
  type: "object",
  title: "Promotion",
  icon: FcBusiness,
  fields: [
    { name: "header", type: "string" },
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
