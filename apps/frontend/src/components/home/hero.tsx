import React from "react";
import { HomHeroProps } from "@lib/@types/home.types";
import { HeroCarousel } from "./hero-carousel";
import { PortableText } from "@utils/sanity";
import { Container } from "@components/ui/container";

export const Hero: React.FC<HomHeroProps> = ({ carousel, description }) => {
  return (
    <section>
      <HeroCarousel carouselItems={carousel} />
      <Container className="py-10 | lg:text-2xl text-xl">
        <PortableText blocks={description} />
      </Container>
    </section>
  );
};
