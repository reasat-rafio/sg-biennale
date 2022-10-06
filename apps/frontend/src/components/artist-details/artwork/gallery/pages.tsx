import { PageProps, PagesProps } from "@lib/@types/artist-details.types";
import { useScroll } from "@lib/helpers/scroll-controls.helper";
import { config, useSpring } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
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
            myTimeout={myTimeout}
            offsetX={offsetX}
            length={arts.length}
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
  pages,
  artworks,
  scrollPassRatio,
  isDown,
  myTimeout,
  offsetX,
}) => {
  const { galleryImagePerPage } = useArtistsDetailsStore();
  const data = useThree((state) => state.viewport);

  const w = pages / galleryImagePerPage;

  const posisitonXMin = Math.floor(-data.width * w);
  let positionXMax = Math.ceil(data.width * w);
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
            outterArrIndex={outterArrIndex}
            innerArrIndex={idx}
            url={artworks[idx].images[0].asset.url}
            artwork={artworks[idx]}
            positionXMax={posisitonXMin}
            scale={[scaleX, scaleY, 1]}
            scrollPassRatio={scrollPassRatio}
            isDown={isDown}
            myTimeout={myTimeout}
            offsetX={offsetX}
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
