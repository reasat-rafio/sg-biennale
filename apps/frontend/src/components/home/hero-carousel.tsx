import { Swiper, SwiperSlide } from "swiper/react";
import { HomHeroProps } from "@lib/@types/home.types";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { Pagination, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface HeroCarouselProps {
  carouselItems: HomHeroProps["carousel"];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  carouselItems,
}) => {
  return (
    <Swiper
      className="h-screen md:h-[75vh]"
      modules={[Pagination, EffectFade]}
      slidesPerView={1}
      effect="fade"
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {carouselItems.map(({ key, image, description, title }) => (
        <SwiperSlide className="relative" key={key}>
          <SanityImg
            width={1200}
            className="h-full w-full absolute object-cover object-center "
            image={image}
            builder={imageUrlBuilder}
            alt={title}
          />
          <div className="absolute h-full w-full flex flex-col justify-center items-center space-y-8">
            <h3 className="text-5xl font-semibold text-white">{title}</h3>
            <p className="text-xl text-gray-300 max-w-sm text-center">
              {description}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
