import { SiApacherocketmq } from "react-icons/si";

const HomeHeroCarouselItem = {
  name: "homePage.hero",
  type: "object",
  title: "Hero",
  icon: SiApacherocketmq,
  fields: [
    {
      name: "carousel",
      type: "array",
      of: [{ type: "homePage.hero.carousel-item" }],
    },
    { name: "description", type: "array", of: [{ type: "block" }] },
  ],
};

export default HomeHeroCarouselItem;
