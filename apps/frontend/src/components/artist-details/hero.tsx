import CardImgScene from "@components/home/news/card-img-scene";
import { Button } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { ICountry } from "@lib/@types/global.types";
import { PortableText } from "@utils/sanity";
import { useState } from "react";
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
  const [scalePos, setScalePos] = useState([0, 0, 0]);

  return (
    <Container type="article" className="grid grid-cols-12 gap-10 py-xl">
      <section className="col-span-7 space-y-10 lg:max-w-[90%]">
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
        <Button variant="secondary">View Artist</Button>
      </section>
      <div className="col-span-5">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="bg-[#F8F8F8] p-20"
        >
          <figure className=" aspect-video">
            <CardImgScene
              hovered={hovered}
              url={images[0].url}
              scalePos={scalePos}
            />
          </figure>
        </div>
      </div>
    </Container>
  );
};
