import { Swiper, SwiperSlide } from "swiper/react";
import { HomHeroProps } from "@lib/@types/home.types";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { useWindowSize } from "@lib/hooks";

interface HeroCarouselProps {
  carouselItems: HomHeroProps["carousel"];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  carouselItems,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Swiper
      className="h-screen md:h-[75vh]"
      modules={[Pagination, EffectFade, Autoplay]}
      slidesPerView={1}
      effect="fade"
      autoplay
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {carouselItems.map(({ key, image, description, title }) => (
        <SwiperSlide className="relative" key={key}>
          <SanityImg
            width={windowWidth >= 1024 ? 1200 : 700}
            className="h-full w-full absolute object-cover object-center "
            image={image}
            builder={imageUrlBuilder}
            alt={title}
          />
          <div className="absolute h-full w-full | flex flex-col justify-center items-center | space-y-8">
            <h3 className="text-5xl font-semibold text-white">{title}</h3>
            <p className="max-w-sm text-center | text-xl text-gray-300">
              {description}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
