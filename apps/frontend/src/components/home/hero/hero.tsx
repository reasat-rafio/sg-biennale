import React from "react";
import { HomHeroProps } from "@lib/@types/home.types";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { Container } from "@components/ui/container";
import { SanityImg } from "sanity-react-extra";
import { HeroCarousel } from "./hero-carousel";

export const Hero: React.FC<HomHeroProps> = ({ image, description, kvs }) => {
  return (
    <section className="mt-x">
      <HeroCarousel kvs={kvs} />
      <Container className="flex space-x-5 mt-xl">
        <div className="flex-1">
          <div className="max-w-lg text-gray--700 | font-manrope text-body-1">
            <PortableText blocks={description} />
          </div>
        </div>
        <figure>
          <SanityImg
            className="w-full object-contain"
            image={image}
            builder={imageUrlBuilder}
            width={600}
            alt=""
          />
        </figure>
      </Container>
    </section>
  );
};
