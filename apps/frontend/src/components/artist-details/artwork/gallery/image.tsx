import { Image as ImageImpl } from "./image-impl";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import { useRef, useState, PointerEvent, RefAttributes, Ref } from "react";
import { BufferGeometry, Group, Mesh } from "three";
import * as THREE from "three";
import { useScroll } from "./scroll-controls";
import { ArtworkProps } from "../artwork";
import {
  opacityController,
  positionController,
  scalingController,
} from "@lib/helpers/artist-details.helpers";
import { ArtworkDescription, CloseIcon } from "./artwork-description";

interface ImageProps {
  outterArrIndex: number;
  innerArrIndex: number;
  position: any;
  scale: any;
  url: string;
  artwork: ArtworkProps;
  positionXMax: number;
}

export const Image: React.FC<ImageProps> = ({
  innerArrIndex,
  outterArrIndex,
  position,
  scale,
  url,
  artwork,
  positionXMax,
}) => {
  const { selectedImage, setSelectedImage, galleryImagePerPage } =
    useArtistsDetailsStore();
  const imageRef = useRef<
    THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | any
  >(null);

  const groupRef = useRef<Group | null>(null);
  const scrollData = useScroll();
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [triggerExitAnimation, setTriggerExitAnimation] = useState(false);
  const data = useThree((state) => state.viewport);
  const w = scrollData.pages / galleryImagePerPage;
  const uniqueIndex = outterArrIndex * 10 + innerArrIndex;

  const onClickAction = () => {
    if (!selectedImage) {
      setSelectedImage({ index: uniqueIndex, artwork: artwork });
    }
  };

  const onPointerOverAction = () => setHovered(true);
  const onPointerOutAction = () => setHovered(false);
  const onPointerMoveAction = (e: ThreeEvent<globalThis.PointerEvent>) => {};
  // console.log(imageRef.current.material.shift);

  let prevOffset = 0;

  useFrame(({ mouse, camera }, delta) => {
    if (hovered && selectedImage) {
      const x = (mouse.x * data.width) / 2;
      const y = (mouse.y * data.height) / 2;
      setOffset({ x, y });
      // imageRef.current.position.x = THREE.MathUtils.damp(
      //   imageRef.current.position.x,
      //   hovered && selectedImage ? x : position[0],
      //   4,
      //   delta
      // );
      // camera.rotation.set(x, 0, 0);
      // imageRef.current.material.zoom = THREE.MathUtils.damp(
      //   imageRef.current.material.zoom,
      //   x,
      //   1,
      //   delta
      // );
      // camera.lookAt(imageRef.current.position);
    }
    imageRef.current.material.shift = THREE.MathUtils.damp(
      imageRef.current.material.shift,
      prevOffset > scrollData.offset
        ? -scrollData.delta * 10
        : scrollData.delta * 10,
      4,
      delta
    );
    prevOffset = scrollData.offset;
    if (groupRef?.current) {
      // groupRef.current.position.z = THREE.MathUtils.damp(
      //   groupRef.current.position.z,
      //   Math.max(0, scrollData.delta * 40),
      //   4,
      //   delta
      // );
    }
    if (imageRef?.current) {
      imageRef.current.material.grayscale = THREE.MathUtils.damp(
        imageRef.current.material.grayscale,
        hovered || selectedImage?.index === uniqueIndex
          ? Math.max(0, 1 - delta * 10000)
          : Math.max(0, 1 - scrollData.delta * 1000),
        4,
        delta
      );

      // imageRef.current.material.zoom = THREE.MathUtils.damp(
      //   imageRef.current.material.zoom,
      //   !selectedImage && hovered
      //     ? 1.05
      //     : Math.max(0, 1 - scrollData.delta * 5),
      //   4,
      //   delta
      // );

      // imageRef.current.material.shift = THREE.MathUtils.damp(
      //   imageRef.current.shift,
      //   200,
      //   10,
      //   delta
      // );

      opacityController({ imageRef, selectedImage, delta, uniqueIndex });
      scalingController({
        imageRef,
        scale,
        delta,
        uniqueIndex,
        selectedImage,
      });
      positionController({
        groupRef,
        imageRef,
        selectedImage,
        uniqueIndex,
        position,
        delta,
        animateXTo:
          outterArrIndex !== 0
            ? scrollData.offset * data.width -
              2.5 +
              scrollData.offset * 2 -
              data.width * w * 2.7
            : scrollData.offset * data.width - 2.3 + scrollData.offset * 2,
      });
    }
  });

  return (
    <group
      onClick={onClickAction}
      onPointerOver={onPointerOverAction}
      onPointerOut={onPointerOutAction}
      ref={groupRef}
    >
      <ArtworkDescription
        triggerExitAnimation={triggerExitAnimation}
        uniqueIndex={uniqueIndex}
        positionXMax={positionXMax}
      />
      <ImageImpl
        // lookAt={() => [offset.x, 0, 0]}
        onPointerMove={onPointerMoveAction}
        ref={imageRef}
        url={url}
      />
      <CloseIcon
        data={data}
        w={w}
        uniqueIndex={uniqueIndex}
        setTriggerExitAnimation={setTriggerExitAnimation}
      />
    </group>
  );
};
