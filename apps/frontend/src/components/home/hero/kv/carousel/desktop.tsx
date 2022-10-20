import { Swiper, SwiperSlide } from "swiper/react";
import { SanityImg, SanityImage } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { Autoplay } from "swiper";
import { motion } from "framer-motion";
import { useWindowSize } from "@lib/hooks";

interface DesktopProps {
  kvs: SanityImage[];
}

export const Desktop: React.FC<DesktopProps> = ({ kvs }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  return (
    <div className="relative">
      <Swiper
        speed={600}
        grabCursor
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        slidesPerView={windowWidth >= 1024 ? 3 : 2}
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
                width={windowWidth >= 1024 ? 400 : 250}
                alt={image.alt}
              />
            </motion.figure>
          </SwiperSlide>
        ))}
      </Swiper>
      <figure className="absolute h-full w-full | top-0 left-0">
        <div className="h-full w-full | bg-[url(/bg/kv.png)] bg-repeat bg-center bg-contain" />
      </figure>
    </div>
  );
};
