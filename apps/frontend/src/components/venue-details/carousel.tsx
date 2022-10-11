import { SanityImage, SanityImg } from "sanity-react-extra";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { imageUrlBuilder } from "@utils/sanity";

interface CarouselProps {
  images: SanityImage[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <section className="xl:pb-14 xl:px-0 lg:px-x sm:px-lg px-md py-10">
      <div className="xl:pl-max ">
        <Swiper speed={600} grabCursor slidesPerView="auto" spaceBetween={20}>
          {images.map((image) => (
            <SwiperSlide className="w-auto" key={image._key}>
              <figure>
                <SanityImg
                  className="h-full w-full | object-cover"
                  image={image}
                  builder={imageUrlBuilder}
                  height={680}
                />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
