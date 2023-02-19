import { SanityImage, SanityImg } from "sanity-react-extra";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { imageUrlBuilder } from "@utils/sanity";
import { useWindowSize } from "@lib/hooks";

interface CarouselProps {
  images: SanityImage[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <section className="xl:px-0 lg:px-x sm:px-lg px-md lg:py-[2rem] py-[1rem] | max-w-[1920px] mx-auto">
      <div className="2xl:pl-max xl:pl-xxl">
        <Swiper speed={600} grabCursor slidesPerView="auto" spaceBetween={20}>
          {images.map((image) => (
            <SwiperSlide className="sm:w-auto w-full" key={image._key}>
              <figure className="h-[300px]">
                <SanityImg
                  className="h-full w-full object-contain"
                  image={image}
                  alt={image?.alt ?? "event image"}
                  builder={imageUrlBuilder}
                  height={
                    windowWidth >= 1280 ? 450 : windowWidth >= 768 ? 350 : 250
                  }
                />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
