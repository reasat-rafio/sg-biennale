import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { Cta } from "@lib/@types/global.types";
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
      <div className="grid grid-cols-12 | mt-10 lg:gap-10 gap-5">
        <figure className="xl:col-span-8 lg:col-span-6 col-span-12 | 2xl:h-[600px] xl:h-[550px] lg:h-[480px] md:h-[450px] sm:h-[400px] h-[300px]">
          <ImageScene image={image} />
        </figure>
        <div className="xl:col-span-4 lg:col-span-6 col-span-12 | font-manrope text-gray--700 text-body-1 | space-y-4 mt-auto">
          <p>{description}</p>
          <Button variant="secondary">{cta.title}</Button>
        </div>
      </div>
    </Container>
  );
};
