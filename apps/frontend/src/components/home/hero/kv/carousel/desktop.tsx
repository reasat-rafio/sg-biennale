import { Swiper, SwiperSlide } from "swiper/react";
import { SanityImg, SanityImage } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { Autoplay } from "swiper";
import clsx from "clsx";
import { motion } from "framer-motion";

interface DesktopProps {
  kvs: SanityImage[];
}

export const Desktop: React.FC<DesktopProps> = ({ kvs }) => {
  return (
    <div className="relative">
      <Swiper
        speed={600}
        grabCursor
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        slidesPerView={3}
        spaceBetween={40}
      >
        {kvs.map((image) => (
          <SwiperSlide
            className="h-[65vh] | flex justify-center items-center drop-shadow"
            key={image._key}
          >
            <motion.figure
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full relative z-10"
            >
              <SanityImg
                className="h-full w-full | object-contain"
                loading="eager"
                image={image}
                builder={imageUrlBuilder}
                width={450}
                alt={image.alt}
              />
            </motion.figure>
          </SwiperSlide>
        ))}
      </Swiper>
      <figure className="absolute h-full w-full | top-0 left-0">
        <div className="h-full w-full | bg-[url(/bg/footer-background-decor.png)] bg-repeat bg-center bg-contain" />
      </figure>
    </div>
  );
};
