import { SanityImage, SanityImg } from "sanity-react-extra";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useState } from "react";
import { imageUrlBuilder } from "@utils/sanity";
import { motion } from "framer-motion";
import { EyeIcon } from "@components/icons/eye";

interface CarouselProps {
  images: SanityImage[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<null | number>(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Navigation, Thumbs]}
        onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
      >
        {images.map((image) => (
          <SwiperSlide className="h-[580px] w-full">
            <SanityImg
              className="w-full h-full object-cover"
              key={image._key}
              builder={imageUrlBuilder}
              height={600}
              image={image}
              alt="img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => {
          if (swiper && !swiper.destroyed) {
            setThumbsSwiper(swiper);
          }
        }}
        spaceBetween={10}
        slidesPerView={5}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-5 cursor-pointer"
      >
        {images.map((image, index) => (
          <SwiperSlide className="relative" key={image._key}>
            <figure className="w-full h-full">
              <SanityImg
                className="w-full h-full object-cover aspect-square"
                key={image._key}
                builder={imageUrlBuilder}
                width={200}
                image={image}
                alt="img"
              />
            </figure>

            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: activeImageIndex === index ? 1 : 0 }}
              className="absolute top-0 left-0 | h-full w-full bg-black bg-opacity-50 | flex justify-center items-center"
            >
              <EyeIcon />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
