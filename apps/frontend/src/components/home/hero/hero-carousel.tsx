import { Swiper, SwiperSlide } from "swiper/react";
import { HomHeroProps } from "@lib/@types/home.types";
import { SanityImg, SanityImage } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useWindowSize } from "@lib/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getShuffledArr } from "@lib/helpers/global.helpers";

interface HeroCarouselProps {
  kvs: SanityImage[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ kvs }) => {
  const [suffledKVs, setSuffledKVs] = useState<SanityImage[]>([]);
  const windowWidth = useWindowSize()?.width ?? 0;

  useEffect(() => {
    setSuffledKVs(getShuffledArr(kvs));
  }, []);

  return (
    <Swiper
      className="pl-xxl"
      speed={600}
      grabCursor
      slidesPerView="auto"
      spaceBetween={20}
    >
      {suffledKVs.map((image, index) => (
        <SwiperSlide
          className={clsx(
            "relative flex justify-center items-center",
            index === 0 && "w-[40vw] mt-[5%] p-16",
            index === 1 && "w-[15vw] p-5",
            index === 2 && "w-[20vw] mt-[25%] -translate-x-[10%] p-10",
            index === 3 && "w-[35vw] mt-[2%] p-14"
          )}
          key={image._key}
        >
          <figure className="w-full relative z-10">
            <SanityImg
              className="h-full w-full | object-contain"
              image={image}
              builder={imageUrlBuilder}
              width={500}
            />
          </figure>

          <div
            className={clsx(
              "absolute top-0 left-0  w-full bg-[#F8F8F8] z-0",
              image.shortBackground ? "h-[65%]" : "h-full"
            )}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
