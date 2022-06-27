import clsx from "clsx";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  Mousewheel,
} from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/thumbs";
import "swiper/css/mousewheel";
import { useRef, useState } from "react";
import { imageUrlBuilder } from "@utils/sanity";
import useGlobalStore from "@stores/global-store";
import { useWindowSize } from "@lib/hooks";

interface ImageCarouselProps {
  className?: string;
  images: SanityImage[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  className,
  images,
}) => {
  const swiperRef = useRef() as any;
  const [activeSlide, setActiveSlide] = useState<SanityImage | null>(images[0]);

  const { footerHeight, navbarHeight } = useGlobalStore();
  const totalAdditionalHeight = footerHeight + navbarHeight;

  const windowHeight = useWindowSize()?.width ?? 0;

  console.log(activeSlide);

  return (
    <div className={clsx(className)}>
      <Swiper
        style={{
          height:
            windowHeight >= 768
              ? `calc(100vh - ${totalAdditionalHeight}px)`
              : `50vh`,
        }}
        className=""
        modules={[Navigation, Pagination, A11y, Autoplay, Mousewheel]}
        autoplay
        direction="vertical"
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        mousewheel
        onInit={(swiper: SwiperCore) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveSlide(images[swiper.activeIndex]);
        }}
      >
        {images.map((img) => (
          <SwiperSlide key={img.key}>
            <SanityImg
              className="h-full w-full object-cover"
              image={img}
              width={800}
              builder={imageUrlBuilder}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
