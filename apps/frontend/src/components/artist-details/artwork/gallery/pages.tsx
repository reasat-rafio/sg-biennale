import { PageProps, PagesProps } from "@lib/@types/artist-details.types";
import { useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import React from "react";
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
            position={[data.width * index, 0, 0]}
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
  const { galleryImagePerPage } = useArtistsDetailsStore();
  const { width } = useThree((state) => state.viewport);

  const spaecBetween = pages / galleryImagePerPage + 0.07;
  const posisitonXMin = Math.floor(-width * spaecBetween);
  let positionXMax = Math.ceil(width * spaecBetween);
  const posXIncreaseBY =
    (positionXMax + Math.abs(posisitonXMin)) / (galleryImagePerPage - 1);

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
