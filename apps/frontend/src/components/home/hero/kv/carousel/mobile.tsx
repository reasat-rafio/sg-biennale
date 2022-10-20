import { Swiper, SwiperSlide } from "swiper/react";
import { SanityImg, SanityImage } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import { useWindowSize } from "@lib/hooks";

interface MobileProps {
  kvs: SanityImage[];
}

export const Mobile: React.FC<MobileProps> = ({ kvs }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  return (
    <div className="relative">
      <Swiper
        speed={600}
        grabCursor
        modules={[Autoplay]}
        effect="fade"
        autoplay={{ delay: 4000 }}
        slidesPerView={windowWidth >= 640 ? 1.5 : 1}
        spaceBetween={30}
      >
        {kvs.map((image) => (
          <SwiperSlide
            className="relative p-10 sm:h-[500px] h-[400px]"
            key={image._key}
          >
            <figure className="relative z-10 h-full w-full | object-contain">
              <SanityImg
                className="h-full w-full | object-contain"
                image={image}
                loading="eager"
                builder={imageUrlBuilder}
                width={windowWidth >= 640 ? 250 : 150}
                alt={image.alt}
              />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
      <figure className="absolute h-full w-full | top-0 left-0">
        <div className="h-full w-full | bg-[url(/bg/footer-background-decor.png)] bg-repeat bg-center bg-contain" />
      </figure>
    </div>
  );
};
