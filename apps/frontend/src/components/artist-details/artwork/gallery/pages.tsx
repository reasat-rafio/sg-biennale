import { PageProps, PagesProps } from "@lib/@types/artist-details.types";
import { config, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import React, { useEffect } from "react";
import { Image } from "./image";

export const Pages: React.FC<PagesProps> = ({
  artworks,
  pages,
  scrollPassRatio,
  isDown,
  myTimeout,
  offsetX,
  setDown,
  setOffsetX,
  setScrollPassRatio,
}) => {
  const data = useThree((state) => state.viewport);
  return (
    <>
      {artworks.map((arts, index) => {
        return (
          <Page
            outterArrIndex={index}
            pages={pages}
            scrollPassRatio={scrollPassRatio}
            isDown={isDown}
            setDown={setDown}
            myTimeout={myTimeout}
            offsetX={offsetX}
            length={arts.length}
            setScrollPassRatio={setScrollPassRatio}
            // position={[5 + data.width * index, 0, 0]}
            position={[5 + data.width * index, 0, 0]}
            artworks={arts.map((_, idx) => artworks[index][idx])}
            setOffsetX={setOffsetX}
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
  pages,
  artworks,
  scrollPassRatio,
  isDown,
  myTimeout,
  offsetX,
  setOffsetX,
  setDown,
  setScrollPassRatio,
}) => {
  const { galleryImagePerPage, selectedImage, selectedCollectionIndex } =
    useArtistsDetailsStore();

  const { width } = useThree((state) => state.viewport);
  const spaecBetween = pages / galleryImagePerPage;
  const posisitonXMin = -galleryImagePerPage;
  let positionXMax = galleryImagePerPage;
  const posXIncreaseBY =
    (positionXMax + Math.abs(posisitonXMin)) / (galleryImagePerPage - 1) - 0.5;

  console.log(positionXMax);

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
            positionXMax={positionXMax}
            posisitonXMin={posisitonXMin}
            scale={[scaleX, scaleY, 1]}
            scrollPassRatio={scrollPassRatio}
            isDown={isDown}
            setDown={setDown}
            progress={progress}
            myTimeout={myTimeout}
            offsetX={offsetX}
            setOffsetX={setOffsetX}
            pages={pages}
            position={[
              posisitonXMin + idx * posXIncreaseBY,
              idx % 2 ? 1.4 : -1.1,
              Math.min(aspectRatio * Math.random(), 0.9),
            ]}
          />
        );
      })}
    </group>
  );
};
