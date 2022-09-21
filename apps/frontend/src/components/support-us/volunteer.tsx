import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import React from "react";
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
      <Swiper
        className="pt-5"
        speed={800}
        slidesPerView={1.2}
        spaceBetween={10}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 2.8,
            spaceBetween: 20,
          },
        }}
      >
        {images.map((image) => (
          <SwiperSlide>
            <div className="p-5 h-[340px] outline-none" key={image._key}>
              <SanityImg
                className="w-full h-full object-cover"
                width={400}
                image={image}
                builder={imageUrlBuilder}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};
