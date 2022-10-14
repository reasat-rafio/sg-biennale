import CardImgScene from "@components/home/news/card-img-scene";
import { Container } from "@components/ui/container";
import { ICountry } from "@lib/@types/global.types";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { Dispatch, SetStateAction, useState } from "react";
import { SanityImage } from "sanity-react-extra";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import clsx from "clsx";

interface HeroProps {
  name: string;
  description: any;
  images: SanityImage[];
  countries: ICountry[];
}

const serializers = {
  types: {
    youtube: ({ node }: any) => {
      const { url } = node;
      const id = getYouTubeId(url as string);
      return <YouTube videoId={id as string} />;
    },
  },
};

export const Hero: React.FC<HeroProps> = ({
  countries,
  description,
  images,
  name,
}) => {
  const [hovered, setHovered] = useState(false);
  const [scalePos, _] = useState([0, 0, 0]);
  const aspectRatio = images[0].metadata.dimensions.aspectRatio;

  const compressedImageUrl = imageUrlBuilder
    .image(images[0])
    .width(500)
    .format("jpg")
    .auto("format")
    .quality(80)
    .url();

  return (
    <Container
      type="article"
      className="grid grid-cols-12 lg:gap-10 | lg:py-xl py-x"
    >
      <section className="lg:col-span-7 col-span-12 | lg:max-w-[90%] max-w-full | space-y-10">
        <div className="lg:hidden block ">
          <Image
            aspectRatio={aspectRatio}
            hovered={hovered}
            scalePos={scalePos}
            setHovered={setHovered}
            url={compressedImageUrl as string}
          />
        </div>
        <header className="space-y-2">
          <h1 className="font-medium text-heading-6">{name}</h1>
          <div>
            {countries.map(({ label, value }, index) => (
              <span key={value}>
                {label}
                {index === countries.length - 1 ? "" : ", "}
              </span>
            ))}
          </div>
        </header>
        <div className="font-manrope text-body-1 text-gray--700 | pb-10">
          <PortableText blocks={description} serializers={serializers} />
        </div>
      </section>
      <div className="col-span-5 | lg:block hidden">
        <Image
          aspectRatio={aspectRatio}
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
  aspectRatio: number;
}
const Image: React.FC<ImageProps> = ({
  hovered,
  setHovered,
  url,
  scalePos,
  aspectRatio,
}) => {
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-[#F8F8F8] sm:p-20 p-14"
    >
      <figure
        className={clsx(aspectRatio > 1.1 ? "aspect-video" : "aspect-square")}
      >
        <CardImgScene hovered={hovered} url={url} scalePos={scalePos} />
      </figure>
    </div>
  );
};
