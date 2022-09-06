import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
import { imageUrlBuilder } from "@utils/sanity";
import { useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";
import { ImageScene } from "./image-scene";

interface TourProps {
  header: string;
  description: string;
  image: SanityImage;
  cta: Cta;
}

export const Tour: React.FC<TourProps> = ({
  header,
  description,
  image,
  cta,
}) => {
  return (
    <Container type="section" className="py-xxl">
      <h2 className="text-heading-4 font-medium">{header}</h2>
      <div className="grid grid-cols-12 | mt-10 gap-10">
        <figure className="col-span-8 h-[600px]">
          <ImageScene image={image} />
        </figure>
        <div className="col-span-4 | font-manrope text-gray--700 text-body-1 | space-y-4 mt-auto">
          <p>{description}</p>
          <Button variant="secondary">{cta.title}</Button>
        </div>
      </div>
    </Container>
  );
};
