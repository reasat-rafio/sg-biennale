import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useScroll } from "./scroll-controls";
import { Image as ImageImpl } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import { ArtworkProps } from "../artwork";

export const Pages: React.FC<{ artworks: ArtworkProps[][] }> = ({
  artworks,
}) => {
  const { width } = useThree((state) => state.viewport);

  return (
    <>
      {artworks.map((arts, index) => (
        <Page
          index={index}
          position={[width * index * 0.7, 0, 0]}
          urls={arts.map((_, idx) => artworks[index][idx].images[0].asset.url)}
          length={arts.length}
          dimensions={arts.map(
            (_, idx) => artworks[index][idx].images[0].asset.metadata.dimensions
          )}
        />
      ))}
    </>
  );
};

function Page({
  index,
  urls,
  position,
  length,
  dimensions,
}: {
  index: number;
  urls: string[];
  position: any;
  length: number;
  dimensions: {
    aspectRatio: number;
    height: number;
    width: number;
  }[];
}) {
  return (
    <group position={position}>
      {Array.from({ length }).map((_, index) => {
        const aspectRatio = dimensions[index].aspectRatio;
        const scaleX = 0.8 + aspectRatio * 1.8;
        const scaleY = 3.5 - aspectRatio;

        return (
          <Image
            position={
              index % 2
                ? [6 + index * 2.3 - length, 1.4, aspectRatio]
                : [6 + index * 2.3 - length, -1.1, aspectRatio]
            }
            scale={[scaleX, scaleY, 1]}
            url={urls[index]}
          />
        );
      })}
    </group>
  );
}

function Image(props: { position: any; scale: any; url: string }) {
  const ref = useRef<any>(null);
  const group = useRef<Group | null>(null);
  const data = useScroll();
  useFrame((_, delta) => {
    if (group?.current)
      group.current.position.z = THREE.MathUtils.damp(
        group.current.position.z,
        Math.max(0, data.delta * 50),
        4,
        delta
      );
    if (ref.current)
      ref.current.material.grayscale = THREE.MathUtils.damp(
        ref.current.material.grayscale,
        Math.max(0, 1 - data.delta * 1000),
        4,
        delta
      );
  });
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  );
}
