import { PageProps, PagesProps } from "@lib/@types/artist-details.types";
import { useScroll } from "@lib/helpers/scroll-controls.helper";
import { config, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import React from "react";
import { Image } from "./image";

export const Pages: React.FC<PagesProps> = ({
  artworks,
  scrollPassRatio,
  isDown,
  offsetX,
  setDown,
  setScrollPassRatio,
  pages,
}) => {
  const data = useThree((state) => state.viewport);
  return (
    <>
      {artworks.map((arts, index) => {
        return (
          <Page
            pages={pages}
            outterArrIndex={index}
            scrollPassRatio={scrollPassRatio}
            isDown={isDown}
            setDown={setDown}
            offsetX={offsetX}
            length={arts.length}
            setScrollPassRatio={setScrollPassRatio}
            position={[data.width * index, 0, 0]}
            artworks={arts.map((_, idx) => artworks[index][idx])}
            dimensions={arts.map(
              (_, idx) =>
                artworks[index][idx].images[0].asset.metadata.dimensions
            )}
          />
        );
      })}
    </>
  );
};

const Page: React.FC<PageProps> = ({
  outterArrIndex,
  position,
  length,
  dimensions,
  artworks,
  scrollPassRatio,
  isDown,
  offsetX,
  setDown,
  setScrollPassRatio,
  pages,
}) => {
  const { galleryImagePerPage, selectedImage, selectedCollectionIndex } =
    useArtistsDetailsStore();

  const { width } = useThree((state) => state.viewport);

  const positionXMin = -(width - 1) / 2;
  let positionXMax = (width - 1) / 2;

  const posXIncreaseBY =
    (positionXMax + Math.abs(positionXMin)) / (galleryImagePerPage - 1);

  const { offset } = useScroll();

  // ? 40 because we want 20% extra and its starting from 0 so we are doubling it up
  const extraUnits = (30 * positionXMax) / 100;
  const imgEndPoint = positionXMax - extraUnits;

  const scrollTo = (1 / (pages - 1)) * selectedCollectionIndex;

  console.log("====================================");
  console.log({ scrollTo });
  console.log("====================================");

  const { progress } = useSpring({
    progress: !selectedImage
      ? Math.min(scrollPassRatio * 0.15 + offsetX * 2, 1)
      : scrollTo,
    config: config.molasses,
  });

  // const { progress } = useSpring({
  //   progress: Math.min(scrollPassRatio * 0.15 + offsetX * 2, 1),
  //   config: config.molasses,
  // });

  return (
    <group position={position}>
      {Array.from({ length }).map((_, idx) => {
        const aspectRatio = dimensions[idx].aspectRatio;
        // const scaleX = 0.8 + aspectRatio * 1.8;
        // const scaleY = 3.5 - aspectRatio;
        const scaleX = 1;
        const scaleY = 1;

        return (
          <Image
            setScrollPassRatio={setScrollPassRatio}
            outterArrIndex={outterArrIndex}
            innerArrIndex={idx}
            url={artworks[idx].images[0].asset.url}
            artwork={artworks[idx]}
            positionXMin={positionXMin}
            scale={[scaleX, scaleY, 1]}
            isDown={isDown}
            setDown={setDown}
            progress={progress}
            scrollTo={scrollTo}
            imgEndPoint={imgEndPoint}
            position={[
              positionXMin + idx * posXIncreaseBY,
              idx % 2 ? 1.4 : -1.1,
              Math.min(aspectRatio * Math.random(), 0.9),
            ]}
          />
        );
      })}
    </group>
  );
};
