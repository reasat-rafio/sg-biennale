import { SiApacherocketmq } from "react-icons/si";

const HomeHeroCarouselItem = {
  name: "homePage.hero",
  type: "object",
  title: "Hero",
  icon: SiApacherocketmq,
  fields: [
    // {
    //   name: "carousel",
    //   type: "array",
    //   of: [{ type: "homePage.hero.carousel-item" }],
    // },
    {
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    { name: "description", type: "array", of: [{ type: "block" }] },
  ],
};

export default HomeHeroCarouselItem;
