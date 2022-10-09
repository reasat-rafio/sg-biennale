import { PageProps, PagesProps } from "@lib/@types/artist-details.types";
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
}) => {
  const data = useThree((state) => state.viewport);
  return (
    <>
      {artworks.map((arts, index) => {
        return (
          <Page
            outterArrIndex={index}
            scrollPassRatio={scrollPassRatio}
            isDown={isDown}
            setDown={setDown}
            offsetX={offsetX}
            length={arts.length}
            setScrollPassRatio={setScrollPassRatio}
            position={[5 + data.width * index, 0, 0]}
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
}) => {
  const { galleryImagePerPage, selectedImage, selectedCollectionIndex } =
    useArtistsDetailsStore();

  const positionXMin = -galleryImagePerPage;
  let positionXMax = galleryImagePerPage;
  const posXIncreaseBY =
    (positionXMax + Math.abs(positionXMin)) / (galleryImagePerPage - 1);

  const scrollTo =
    selectedCollectionIndex && selectedCollectionIndex === 0
      ? 0
      : selectedCollectionIndex === 1
      ? 0.4
      : selectedCollectionIndex === 2
      ? 0.8
      : 0;

  const { progress } = useSpring({
    progress: !selectedImage
      ? Math.min(scrollPassRatio * 0.15 + offsetX * 2, 1)
      : scrollTo,
    config: config.molasses,
  });

  return (
    <group position={position}>
      {Array.from({ length }).map((_, idx) => {
        const aspectRatio = dimensions[idx].aspectRatio;
        const scaleX = 0.8 + aspectRatio * 1.8;
        const scaleY = 3.5 - aspectRatio;

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
