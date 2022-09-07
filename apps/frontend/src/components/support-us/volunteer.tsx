import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface VolunteerProps {
  header: string;
  description: string;
  cta: Cta;
  images: SanityImage[];
}

export const Volunteer: React.FC<VolunteerProps> = ({
  header,
  description,
  cta,
  images,
}) => {
  const swiperRef = useRef() as any;
  const [activeSlide, setActiveSlide] = useState<SanityImage | null>(images[0]);

  return (
    <Container className="py-max">
      <section className="grid grid-cols-12 | items-center">
        <h2 className="col-span-2 lg:text-heading-4 text-heading-5 font-medium">
          {header}
        </h2>
        <p className="col-span-8 | text-gray--700 text-body-1 | font-manrope | mx-20">
          {description}
        </p>
        <div className="col-span-2">
          <Button>{cta.title}</Button>
        </div>
      </section>
      <div></div>
    </Container>
  );
};

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};
