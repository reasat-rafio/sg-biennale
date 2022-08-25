import { useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import React from "react";
import { ArtworkProps } from "../artwork";
import { Image } from "./image";

interface PageProps {
  outterArrIndex: number;
  urls: string[];
  position: any;
  length: number;
  pages: number;
  dimensions: {
    aspectRatio: number;
    height: number;
    width: number;
  }[];
}

export const Pages: React.FC<{
  artworks: ArtworkProps[][];
  pages: number;
}> = ({ artworks, pages }) => {
  const data = useThree((state) => state.viewport);

  return (
    <>
      {artworks.map((arts, index) => {
        return (
          <Page
            outterArrIndex={index}
            pages={pages}
            length={arts.length}
            position={[data.width * index, 0, 0]}
            urls={arts.map(
              (_, idx) => artworks[index][idx].images[0].asset.url
            )}
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
  urls,
  position,
  length,
  dimensions,
  pages,
}) => {
  const { galleryImagePerPage } = useArtistsDetailsStore();

  const data = useThree((state) => state.viewport);
  const w =
    data.width < 10 ? 2 / galleryImagePerPage : pages / galleryImagePerPage;
  let startingXPosition = -data.width * w;

  return (
    <group position={position}>
      {Array.from({ length }).map((_, idx) => {
        const aspectRatio = dimensions[idx].aspectRatio;
        const scaleX = 0.8 + aspectRatio * 1.8;
        const scaleY = 3.5 - aspectRatio;

        startingXPosition += (data.width * w * 2) / galleryImagePerPage;

        return (
          <Image
            outterArrIndex={outterArrIndex}
            innerArrIndex={idx}
            url={urls[idx]}
            scale={[scaleX, scaleY, 1]}
            position={[
              startingXPosition,
              idx % 2 ? 1.4 : -1.1,
              aspectRatio * 0.5,
            ]}
          />
        );
      })}
    </group>
  );
};
