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
    <section className="xl:pb-14 xl:px-0 lg:px-x sm:px-lg px-md lg:py-xxl py-x">
      <div className="xl:pl-max ">
        <Swiper speed={600} grabCursor slidesPerView="auto" spaceBetween={20}>
          {images.map((image) => (
            <SwiperSlide className="w-auto" key={image._key}>
              <figure>
                <SanityImg
                  className="h-full w-full | object-cover"
                  image={image}
                  builder={imageUrlBuilder}
                  height={
                    windowWidth >= 1280 ? 680 : windowWidth >= 768 ? 350 : 250
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
