import { useFrame, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useScroll } from "./scroll-controls";
import { Html, Image as ImageImpl } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import { ArtworkProps } from "../artwork";

export const Pages: React.FC<{
  artworks: ArtworkProps[][];
  clicked: null | number;
  setClikced: Dispatch<SetStateAction<null | number>>;
}> = ({ artworks, clicked, setClikced }) => {
  const { width } = useThree((state) => state.viewport);

  return (
    <>
      {artworks.map((arts, index) => (
        <Page
          index={index}
          clicked={clicked}
          length={arts.length}
          setClikced={setClikced}
          position={[width * index * 0.7, 0, 0]}
          urls={arts.map((_, idx) => artworks[index][idx].images[0].asset.url)}
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
  setClikced,
  clicked,
}: {
  index: number;
  urls: string[];
  position: any;
  length: number;
  clicked: null | number;
  setClikced: Dispatch<SetStateAction<null | number>>;
  dimensions: {
    aspectRatio: number;
    height: number;
    width: number;
  }[];
}) {
  return (
    <group position={position}>
      {Array.from({ length }).map((_, idx) => {
        const aspectRatio = dimensions[idx].aspectRatio;
        const scaleX = 0.8 + aspectRatio * 1.8;
        const scaleY = 3.5 - aspectRatio;

        return (
          <Image
            index={index}
            idx={idx}
            clicked={clicked}
            setClikced={setClikced}
            url={urls[idx]}
            scale={[scaleX, scaleY, 1]}
            position={
              idx % 2
                ? [6 + idx * 2.3 - length, 1.4, aspectRatio * 0.5]
                : [6 + idx * 2.3 - length, -1.1, aspectRatio * 0.5]
            }
          />
        );
      })}
    </group>
  );
}

function Image(props: {
  index: number;
  idx: number;
  position: any;
  scale: any;
  url: string;
  clicked: null | number;
  setClikced: Dispatch<SetStateAction<null | number>>;
}) {
  const imageRef = useRef<any>(null);
  const group = useRef<Group | null>(null);
  const data = useScroll();
  const [hovered, setHovered] = useState(false);

  const [clicked, setClikced] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame((_, delta) => {
    if (group?.current) {
      group.current.position.z = THREE.MathUtils.damp(
        group.current.position.z,
        Math.max(0, data.delta * 20),
        4,
        delta
      );
    }

    if (imageRef?.current) {
      imageRef.current.material.grayscale = THREE.MathUtils.damp(
        imageRef.current.material.grayscale,
        hovered || clicked
          ? Math.max(0, 1 - delta * 10000)
          : Math.max(0, 1 - data.delta * 1000),
        4,
        delta
      );

      imageRef.current.material.zoom = THREE.MathUtils.damp(
        imageRef.current.material.zoom,
        hovered ? 1.05 : Math.max(0, 1 - data.delta * 5),
        4,
        delta
      );

      imageRef.current.material.scale[0] = imageRef.current.scale.x =
        THREE.MathUtils.damp(
          imageRef.current.scale.x,
          clicked ? 5 : props.scale[0],
          6,
          delta
        );
      imageRef.current.material.scale[1] = imageRef.current.scale.y =
        THREE.MathUtils.damp(
          imageRef.current.scale.y,
          clicked ? 3 : props.scale[1],
          8,
          delta
        );
      imageRef.current.position.z = THREE.MathUtils.damp(
        imageRef.current.position.z,
        clicked ? 1 : props.position[2],
        4,
        delta
      );
      imageRef.current.position.y = THREE.MathUtils.damp(
        imageRef.current.position.y,
        clicked ? 0 : props.position[1],
        4,
        delta
      );
    }
  });
  return (
    <group
      onClick={() => {
        setClikced(!clicked);
        // document.body.style.position = "fixed";
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      ref={group}
    >
      <ImageImpl ref={imageRef} {...props} />
      {/* {clicked && (
        <Html position={[-0, 3, 0]} className="">
          <div className="fixed left-0 top-0 w-screen min-h-[120vh] bg-black bg-opacity-60 backdrop-blur-md !z-50 ">
            a
          </div>
        </Html>
      )} */}
    </group>
  );
}
