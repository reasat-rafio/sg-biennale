import { SanityImg } from "sanity-react-extra";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Dispatch, SetStateAction, useState } from "react";
import { imageUrlBuilder } from "@utils/sanity";
import { motion } from "framer-motion";
import { EyeIcon } from "@components/icons/eye";
import { ArrowLeftIcon } from "@components/icons/arrow-left";
import { ArrowRightIcon } from "@components/icons/arrow-right";
import { useWindowSize } from "@lib/hooks";
import {
  ArtworkAndArtistImageProps,
  ArtworkProps,
} from "@lib/@types/artist-details.types";

interface CarouselProps {
  artworkAndArtistImages: ArtworkAndArtistImageProps[];
  activeCarouselIndex: null | number;
  setActiveCarouslIndex: Dispatch<SetStateAction<null | number>>;
}

export const Carousel: React.FC<CarouselProps> = ({
  artworkAndArtistImages,
  activeCarouselIndex,
  setActiveCarouslIndex,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <div className="relative">
        <Swiper
          spaceBetween={10}
          navigation={{ prevEl, nextEl }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          onSlideChange={(swiper) => setActiveCarouslIndex(swiper.activeIndex)}
        >
          {artworkAndArtistImages?.map(({ image }, index) => (
            <SwiperSlide
              key={image._key + index}
              className="aspect-square w-full lg:max-h-[580px] max-h-[450px]"
            >
              <SanityImg
                className="w-full h-full object-cover"
                builder={imageUrlBuilder}
                height={
                  windowWidth >= 1280
                    ? 600
                    : windowWidth >= 1024
                    ? 500
                    : windowWidth >= 640
                    ? 250
                    : 150
                }
                image={image}
                alt="img"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <motion.button
          className="absolute z-10 | left-5 top-1/2 -translate-y-1/2 | flex justify-center items-center | h-5 w-6 | p-5 bg-white rounded-full bg-opacity-50 | hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer hover:shadow"
          ref={(node) => setPrevEl(node)}
        >
          <span className="drop-shadow">
            <ArrowLeftIcon />
          </span>
        </motion.button>
        <button
          className="absolute z-10 | right-5 top-1/2 -translate-y-1/2 | flex justify-center items-center | h-5 w-6 | p-5 bg-white rounded-full bg-opacity-50 | hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer hover:shadow"
          ref={(node) => setNextEl(node)}
        >
          <span className="drop-shadow">
            <ArrowRightIcon />
          </span>
        </button>
      </div>
      <Swiper
        onSwiper={(swiper) => {
          if (swiper && !swiper.destroyed) {
            setThumbsSwiper(swiper);
          }
        }}
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          1024: {
            slidesPerView: 5,
          },
        }}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-5 cursor-pointer"
      >
        {artworkAndArtistImages.map(({ image }, index) => (
          <SwiperSlide className="relative" key={image._key}>
            <figure className="w-full h-full">
              <SanityImg
                className="w-full h-full object-cover aspect-square max-h-[200px]"
                builder={imageUrlBuilder}
                width={windowWidth >= 1024 ? 200 : windowWidth >= 400 ? 70 : 50}
                image={image}
                alt="img"
              />
            </figure>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeCarouselIndex === index ? 1 : 0 }}
              className="absolute top-0 left-0 | h-full w-full bg-black bg-opacity-50 | flex justify-center items-center"
            >
              <EyeIcon className="lg:w-8 lg:h-8 w-5 h-5" />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
