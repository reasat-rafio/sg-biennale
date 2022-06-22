import React from "react";
import { HomHeroProps } from "@lib/@types/home.types";
import { Swiper, SwiperSlide } from "swiper/react";

export const Hero: React.FC<HomHeroProps> = ({ carousel, description }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};
