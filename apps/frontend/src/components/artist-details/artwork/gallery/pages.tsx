import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { ArtworkGalleryProps } from "./artwork-gallery";
import { useScroll } from "./scroll-controls";
import { Image as ImageImpl } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";

export const Pages: React.FC<ArtworkGalleryProps> = ({ artworks }) => {
  const { width } = useThree((state) => state.viewport);
  const arts = artworks.map(({ images }) => images[0]);

  return (
    <>
      <Page
        position={[width * 0, 0, 0]}
        urls={[arts[3].asset.url, arts[4].asset.url, arts[5].asset.url]}
      />
      <Page
        position={[width * 1, 0, 0]}
        urls={[arts[0].asset.url, arts[1].asset.url, arts[2].asset.url]}
      />
    </>
  );
};

function Page({
  m = 0.4,
  urls,
  ...props
}: {
  m?: number;
  urls: [string, string, string];
  position: any;
}) {
  const { width } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 1 / 3;

  return (
    <group {...props}>
      <Image
        position={[-width * w, 0, -1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[0]}
      />
      <Image
        position={[0, 0, 0]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[1]}
      />
      <Image
        position={[width * w, 0, 1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[2]}
      />
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
