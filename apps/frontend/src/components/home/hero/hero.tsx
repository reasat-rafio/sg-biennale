import React from "react";
import { HomHeroProps } from "@lib/@types/home.types";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { Container } from "@components/ui/container";
import { SanityImg } from "sanity-react-extra";
import { useWindowSize } from "@lib/hooks";

export const Hero: React.FC<HomHeroProps> = ({ image, description }) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  return (
    <Container
      type="section"
      className="flex flex-col-reverse sm:flex-row | md:space-x-5 sm:space-x-2 mt-xl"
    >
      <div className="flex-1">
        <div className="sm:max-w-2xl w-full text-gray--700 | font-manrope text-body-1">
          <PortableText blocks={description} />
        </div>
      </div>
      <figure className="mb-7 sm:mb-0">
        <SanityImg
          className="w-full object-contain"
          image={image}
          builder={imageUrlBuilder}
          width={windowWidth >= 1280 ? 400 : windowWidth >= 768 ? 300 : 250}
          alt={image.alt}
        />
      </figure>
    </Container>
  );
};
