import { SiApacherocketmq } from "react-icons/si";

const HomeHeroCarouselItem = {
  name: "homePage.hero",
  type: "object",
  title: "Hero",
  icon: SiApacherocketmq,
  fields: [
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
