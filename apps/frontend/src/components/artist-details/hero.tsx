import CardImgScene from "@components/home/news/card-img-scene";
import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { ICountry } from "@lib/@types/global.types";
import { PortableText } from "@utils/sanity";
import { Dispatch, SetStateAction, useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";

interface HeroProps {
  name: string;
  description: any;
  images: SanityImage[];
  countries: ICountry[];
}

export const Hero: React.FC<HeroProps> = ({
  countries,
  description,
  images,
  name,
}) => {
  const [hovered, setHovered] = useState(false);
  const [scalePos, _] = useState([0, 0, 0]);

  return (
    <Container
      type="article"
      className="grid grid-cols-12 lg:gap-10 | lg:py-xl py-x"
    >
      <section className="lg:col-span-7 col-span-12 | lg:max-w-[90%] max-w-full | space-y-10">
        <div className="lg:hidden block ">
          <Image
            hovered={hovered}
            scalePos={scalePos}
            setHovered={setHovered}
            url={images[0].url}
          />
        </div>
        <header className="space-y-2">
          <h1 className="font-medium text-heading-6">{name}</h1>
          <div>
            {countries.map(({ label, value }) => (
              <span key={value}>{label}, </span>
            ))}
          </div>
        </header>
        <div className="font-manrope text-body-1 text-gray--700 | pb-10">
          <PortableText blocks={description} />
        </div>
        <div className="flex flex-col ">
          <Button className="md:w-fit !w-full " variant="secondary">
            View Artist
          </Button>
        </div>
      </section>
      <div className="col-span-5 | lg:block hidden">
        <Image
          hovered={hovered}
          scalePos={scalePos}
          setHovered={setHovered}
          url={images[0].url}
        />
      </div>
    </Container>
  );
};

interface ImageProps {
  hovered: boolean;
  setHovered: Dispatch<SetStateAction<boolean>>;
  url: string;
  scalePos: number[];
}
const Image: React.FC<ImageProps> = ({
  hovered,
  setHovered,
  url,
  scalePos,
}) => {
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-[#F8F8F8] sm:p-20 p-14"
    >
      <figure className="aspect-square">
        <CardImgScene hovered={hovered} url={url} scalePos={scalePos} />
      </figure>
    </div>
  );
};
