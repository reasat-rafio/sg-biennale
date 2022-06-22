import React from "react";
import { HomHeroProps } from "@lib/@types/home.types";
import { HeroCarousel } from "./hero-carousel";

export const Hero: React.FC<HomHeroProps> = ({ carousel, description }) => {
  return <HeroCarousel carouselItems={carousel} />;
};
