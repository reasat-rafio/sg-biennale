import React from "react";
import { HomHeroProps } from "@lib/@types/home.types";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { Container } from "@components/ui/container";
import { SanityImg } from "sanity-react-extra";
import { Carousel } from "./carousel";

export const Hero: React.FC<HomHeroProps> = ({ image, description, kvs }) => {
  return (
    <section className="mt-x">
      <Carousel kvs={kvs} />
      <Container className="flex flex-col-reverse sm:flex-row | md:space-x-5 sm:space-x-2 mt-xl">
        <div className="flex-1">
          <div className="sm:max-w-lg w-full text-gray--700 | font-manrope text-body-1">
            <PortableText blocks={description} />
          </div>
        </div>
        <figure className="mb-7 sm:mb-0">
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
