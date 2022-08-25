import { Html, Image as ImageImpl } from "@react-three/drei";
import { useWindowSize } from "@lib/hooks";
import { useFrame, useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import * as THREE from "three";
import { useScroll } from "./scroll-controls";

interface ImageProps {
  outterArrIndex: number;
  innerArrIndex: number;
  position: any;
  scale: any;
  url: string;
}

export const Image: React.FC<ImageProps> = ({
  innerArrIndex,
  outterArrIndex,
  position,
  scale,
  url,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  const { selectedImage, setSelectedImage } = useArtistsDetailsStore();
  const imageRef = useRef<any>(null);
  const group = useRef<Group | null>(null);
  const scrollData = useScroll();
  const [hovered, setHovered] = useState(false);
  const data = useThree((state) => state.viewport);

  //   console.log(data);

  const uniqueIndex = outterArrIndex * 10 + innerArrIndex;
  const totoalCanvasWidth = windowWidth * scrollData.pages;

  //   const asd = totoalCanvasWidth * (scrollData.offset / 190);

  const onClickAction = () => {
    if (uniqueIndex !== selectedImage) setSelectedImage(uniqueIndex);
    else setSelectedImage(null);
  };

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame((_, delta) => {
    if (group?.current) {
      group.current.position.z = THREE.MathUtils.damp(
        group.current.position.z,
        Math.max(0, scrollData.delta * 20),
        4,
        delta
      );
    }

    if (imageRef?.current) {
      imageRef.current.material.grayscale = THREE.MathUtils.damp(
        imageRef.current.material.grayscale,
        hovered || selectedImage === uniqueIndex
          ? Math.max(0, 1 - delta * 10000)
          : Math.max(0, 1 - scrollData.delta * 1000),
        4,
        delta
      );

      imageRef.current.material.zoom = THREE.MathUtils.damp(
        imageRef.current.material.zoom,
        hovered ? 1.05 : Math.max(0, 1 - scrollData.delta * 5),
        4,
        delta
      );

      imageRef.current.material.scale[0] = imageRef.current.scale.x =
        THREE.MathUtils.damp(
          imageRef.current.scale.x,
          selectedImage === uniqueIndex ? 5 : scale[0],
          6,
          delta
        );
      imageRef.current.material.scale[1] = imageRef.current.scale.y =
        THREE.MathUtils.damp(
          imageRef.current.scale.y,
          selectedImage === uniqueIndex ? 3 : scale[1],
          8,
          delta
        );
      imageRef.current.position.z = THREE.MathUtils.damp(
        imageRef.current.position.z,
        selectedImage === uniqueIndex ? 1 : position[2],
        4,
        delta
      );
      imageRef.current.position.y = THREE.MathUtils.damp(
        imageRef.current.position.y,
        selectedImage === uniqueIndex ? 0 : position[1],
        4,
        delta
      );

      imageRef.current.position.x = THREE.MathUtils.damp(
        imageRef.current.position.x,
        selectedImage === uniqueIndex ? 0 : position[0],
        4,
        delta
      );
    }
  });

  return (
    <group
      onClick={onClickAction}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      ref={group}
    >
      <ImageImpl ref={imageRef} url={url} />
      {/* {clicked && (
        <Html position={[-0, 3, 0]} className="">
          <div className="fixed left-0 top-0 w-screen min-h-[120vh] bg-black bg-opacity-60 backdrop-blur-md !z-50 ">
            a
          </div>
        </Html>
      )} */}
    </group>
  );
};
