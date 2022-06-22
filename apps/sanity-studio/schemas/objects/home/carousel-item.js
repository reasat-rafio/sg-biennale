import { BsImages } from "react-icons/bs";

const CarouselItem = {
  name: "homePage.hero.carousel-item",
  title: "Carousel Item",
  type: "object",
  icon: BsImages,
  fields: [
    { name: "title", type: "string" },
    { name: "description", type: "text" },
    { name: "image", type: "image" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image",
    },
  },
};

export default CarouselItem;
