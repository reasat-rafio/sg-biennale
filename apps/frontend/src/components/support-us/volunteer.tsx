import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { SanityImage, SanityImg } from "sanity-react-extra";
import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageUrlBuilder } from "@utils/sanity";

interface VolunteerProps {
  header: string;
  description: string;
  cta: Cta;
  images: SanityImage[];
}

const settings = {
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const Volunteer: React.FC<VolunteerProps> = ({
  header,
  description,
  cta,
  images,
}) => {
  return (
    <Container className="2xl:py-max lg:py-xxl py-xl">
      <section className="grid grid-cols-12 | items-center">
        <header className="xl:col-span-10 col-span-12 grid grid-cols-12 | items-center">
          <h2 className="2xl:col-span-2 col-span-12  lg:text-heading-4 text-heading-5 font-medium">
            {header}
          </h2>
          <p className="2xl:col-span-10 col-span-12 | text-gray--700 text-body-1 | font-manrope | 2xl:mx-20 2xl:my-0 my-5">
            {description}
          </p>
        </header>

        <div className="xl:col-span-2 col-span-12">
          <Button>{cta.title}</Button>
        </div>
      </section>
      {/* <Swiper>
        <SwiperSlide>asd</SwiperSlide>
        <SwiperSlide>asd</SwiperSlide>
        <SwiperSlide>asd</SwiperSlide>
      </Swiper> */}
      <Slider className="lg:my-8 my-5" {...settings}>
        {images.map((image) => (
          <div className="p-5 h-[330px] outline-none" key={image._key}>
            <SanityImg
              className="w-full h-full object-cover"
              width={400}
              image={image}
              builder={imageUrlBuilder}
            />
          </div>
        ))}
      </Slider>
      {/* <div ref={ref} className="keen-slider">
        <div className="keen-slider__slide number-slide1">1</div>
        <div className="keen-slider__slide number-slide2">2</div>
        <div className="keen-slider__slide number-slide3">3</div>
        <div className="keen-slider__slide number-slide4">4</div>
        <div className="keen-slider__slide number-slide5">5</div>
        <div className="keen-slider__slide number-slide6">6</div>
      </div> */}
    </Container>
  );
};
