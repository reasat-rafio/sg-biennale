const HomeHeroCarouselItem = {
  name: "homePage.hero",
  type: "object",
  title: "Hero",
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
