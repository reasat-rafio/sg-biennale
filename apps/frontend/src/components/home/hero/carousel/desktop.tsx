import { Swiper, SwiperSlide } from "swiper/react";
import { SanityImg, SanityImage } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { Autoplay } from "swiper";
import clsx from "clsx";
import { motion } from "framer-motion";

interface DesktopProps {
  suffledKVs: SanityImage[];
}

export const Desktop: React.FC<DesktopProps> = ({ suffledKVs }) => {
  return (
    <Swiper
      className="pl-xxl"
      speed={600}
      grabCursor
      modules={[Autoplay]}
      autoplay={{ delay: 4000 }}
      slidesPerView="auto"
      spaceBetween={40}
    >
      {suffledKVs.map((image, index) => (
        <SwiperSlide
          className={clsx(
            "relative flex justify-center items-center",
            index === 0 && "w-[40vw] mt-[5%]",
            index === 1 && "w-[15vw]",
            index === 2 && "w-[20vw] mt-[25%] -translate-x-[10%]",
            index === 3 && "w-[35vw] mt-[2%]"
          )}
          key={image._key}
        >
          <motion.figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full relative z-10"
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

          <div
            className={clsx(
              "absolute top-0 left-0 w-full z-0",
              image.shortBackground ? "h-[65%]" : "h-full"
            )}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
