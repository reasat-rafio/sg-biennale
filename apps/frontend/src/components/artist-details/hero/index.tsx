import { Container } from "@components/ui/container";
import { ICountry } from "@lib/@types/global.types";
import { SanityImage } from "sanity-react-extra";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import { useWindowSize } from "@lib/hooks";
import { Carousel } from "./carousel";
import { PortableText } from "@utils/sanity";
import {
  ArtworkAndArtistImageProps,
  ArtworkProps,
  MediaSectionProps,
} from "@lib/@types/artist-details.types";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import parse from "html-react-parser";

interface HeroProps {
  name: string;
  description: any;
  images: SanityImage[];
  countries: ICountry[];
  artworks: ArtworkProps[];
}

const serializers = {
  types: {
    youtube: ({ node }: any) => {
      const { url } = node;
      const id = getYouTubeId(url as string);
      return (
        <YouTube className="[&>*]:max-w-full mb-4" videoId={id as string} />
      );
    },
    code: ({ node }: any) => {
      return parse(node.code);
    },
  },
};

export const Hero: React.FC<HeroProps> = ({
  countries,
  description,
  images,
  name,
  artworks,
}) => {
  // const windowWidth = useWindowSize()?.width ?? 0;
  const [activeCarouselIndex, setActiveCarouslIndex] = useState<null | number>(
    null
  );
  const [artworkAndArtistImages, setArtworkAndArtistImages] = useState<
    ArtworkAndArtistImageProps[]
  >([]);

  useEffect(() => {
    const artworkImages = artworks
      .map(({ images }) => images)
      .flat()
      .map((image) => ({
        type: "artwork",
        image: image,
      }));
    const imgs = images.map((image) => ({ type: "artist", image: image }));
    setArtworkAndArtistImages([...imgs, ...artworkImages]);
  }, []);

  const __mediaSectionProps = {
    images,
    artworks,
    activeCarouselIndex,
    setActiveCarouslIndex,
    artworkAndArtistImages,
  };

  return (
    <Container
      type="article"
      className="grid grid-cols-12 lg:gap-10 | lg:py-xl py-x"
    >
      <section className="lg:col-span-6 col-span-12 | lg:max-w-[90%] max-w-full | space-y-10">
        {artworkAndArtistImages?.length && (
          <div className="lg:hidden block">
            <MediaSection {...__mediaSectionProps} />
          </div>
        )}

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
        <div className="font-manrope prose text-gray--700 | pb-10">
          <PortableText blocks={description} serializers={serializers} />
        </div>
      </section>
      <div className="col-span-6 | lg:block hidden">
        {artworkAndArtistImages?.length && (
          <MediaSection {...__mediaSectionProps} />
        )}
      </div>
    </Container>
  );
};

const MediaSection: React.FC<MediaSectionProps> = ({
  images,
  artworks,
  activeCarouselIndex,
  setActiveCarouslIndex,
  artworkAndArtistImages,
}) => {
  return (
    <>
      <Carousel
        activeCarouselIndex={activeCarouselIndex}
        setActiveCarouslIndex={setActiveCarouslIndex}
        artworkAndArtistImages={artworkAndArtistImages}
      />
      <AnimatePresence exitBeforeEnter>
        {activeCarouselIndex !== null &&
          artworks[activeCarouselIndex - images.length - 1] &&
          artworkAndArtistImages[activeCarouselIndex].type === "artwork" && (
            <motion.div
              key={activeCarouselIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-manrope mt-5 prose"
            >
              <PortableText
                blocks={
                  artworks[activeCarouselIndex - images.length - 1]?.description
                }
              />
            </motion.div>
          )}
      </AnimatePresence>
    </>
  );
};
