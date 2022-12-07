import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Header } from "@components/ui/header";
import { useRouter } from "next/router";
import { Button } from "@components/ui/button";
import { useWindowSize } from "@lib/hooks";

interface VolunteerProps {
  header: string;
  description: string;
  cta: Cta;
  images?: SanityImage[];
}

export const Volunteer: React.FC<VolunteerProps> = ({
  header,
  description,
  cta,
  images,
}) => {
  const router = useRouter();
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Container className="2xl:py-max lg:py-xxl py-xl">
      <section className="grid grid-cols-12 | items-center">
        <header className="xl:col-span-10 col-span-12 grid grid-cols-12 | items-center">
          <Header className=" 2xl:col-span-2 col-span-12 ">{header}</Header>
          <p className="2xl:col-span-10 col-span-12 | text-gray--700 text-body-1 | font-manrope | 2xl:mx-20 2xl:my-0 my-5">
            {description}
          </p>
        </header>

        <div className="xl:col-span-2 col-span-12">
          <Button onClick={() => router.push(cta.href)}>{cta.title}</Button>
        </div>
      </section>
      {images?.length && (
        <Swiper
          className="pt-5"
          speed={800}
          slidesPerView={1.2}
          spaceBetween={5}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 2.8,
              spaceBetween: 20,
            },
          }}
        >
          {images.map((image, idx) => (
            <SwiperSlide key={images[0].asset._id + idx}>
              <div className="p-5 h-[340px] outline-none" key={image._key}>
                <SanityImg
                  className="w-full h-full object-cover"
                  width={
                    windowWidth >= 1280 ? 400 : windowWidth >= 768 ? 300 : 200
                  }
                  image={image}
                  builder={imageUrlBuilder}
                  alt={image.alt}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};
