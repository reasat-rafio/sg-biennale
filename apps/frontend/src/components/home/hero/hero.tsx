import React from "react";
import { HomHeroProps } from "@lib/@types/home.types";
import { PortableText } from "@utils/sanity";
import { Container } from "@components/ui/container";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
});

export const Hero: React.FC<HomHeroProps> = ({ image, description }) => {
  return (
    <section className="h-screen">
      <HeroScene image={image} />
      <Container>
        <PortableText blocks={description} />
      </Container>
    </section>
  );
};
