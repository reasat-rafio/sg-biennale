import { Swiper, SwiperSlide } from "swiper/react";
import { SanityImg, SanityImage } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { Autoplay } from "swiper";
import clsx from "clsx";
import "swiper/css/autoplay";
import "swiper/css";

interface MobileProps {
  suffledKVs: SanityImage[];
}

export const Mobile: React.FC<MobileProps> = ({ suffledKVs }) => {
  return (
    <Swiper
      className=""
      speed={600}
      grabCursor
      modules={[Autoplay]}
      effect="fade"
      autoplay={{ delay: 4000 }}
      slidesPerView={1}
      spaceBetween={30}
    >
      {suffledKVs.map((image, index) => (
        <SwiperSlide
          className="relative p-10 sm:h-[500px] h-[400px]"
          key={image._key}
        >
          <figure className="relative z-10 h-full w-full | object-contain">
            <SanityImg
              className="h-full w-full | object-contain"
              image={image}
              builder={imageUrlBuilder}
              width={200}
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