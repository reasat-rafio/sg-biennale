import { Image as ImageImpl } from "./image-impl";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import {
  opacityController,
  positionController,
  scalingController,
} from "@lib/helpers/artist-details.helpers";
import { ArtworkDescription, CloseIcon } from "./artwork-description";
import { useScroll } from "@lib/helpers/scroll-controls.helper";
import { ImageProps } from "@lib/@types/artist-details.types";
import { config, useSpring } from "@react-spring/three";

export const Image: React.FC<ImageProps> = ({
  innerArrIndex,
  outterArrIndex,
  position,
  scale,
  url,
  artwork,
  positionXMax,
  isDown,
  myTimeout,
  offsetX,
  scrollPassRatio,
}) => {
  const { selectedImage, setSelectedImage, galleryImagePerPage } =
    useArtistsDetailsStore();
  const imageRef = useRef<
    THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | any
  >(null);

  const groupRef = useRef<THREE.Group | null>(null);
  const scrollData = useScroll();
  const [hovered, setHovered] = useState(false);
  const [imageHoverGlitchAnimation, setImageHoverGlitchAnimation] =
    useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [triggerExitAnimation, setTriggerExitAnimation] = useState(false);
  const data = useThree((state) => state.viewport);
  const w = scrollData.pages / galleryImagePerPage;
  const uniqueIndex = outterArrIndex * 10 + innerArrIndex;
  const selectedImagePosition =
    outterArrIndex !== 0
      ? scrollData.offset * data.width -
        2.5 +
        scrollData.offset * 2 -
        data.width * w * 2.7
      : scrollData.offset * data.width - 2.3 + scrollData.offset * 2;

  useEffect(() => {
    if (hovered && !selectedImage) {
      setImageHoverGlitchAnimation(true),
        setTimeout(() => setImageHoverGlitchAnimation(false), 500);
    } else setImageHoverGlitchAnimation(false);
  }, [hovered, selectedImage]);

  const onClickAction = () => {
    if (!selectedImage) {
      setSelectedImage({ index: uniqueIndex, artwork: artwork });
    }
  };

  const onPointerOverAction = () => {
    setHovered(true);
  };
  const onPointerOutAction = () => {
    setOffset({ x: 10, y: 0 });
    setHovered(false);
  };
  const onPointerMoveAction = (e: ThreeEvent<globalThis.PointerEvent>) => {};

  const { progress } = useSpring({
    progress: Math.min(scrollPassRatio * 0.1 + offsetX * 2, 1),
    config: config.molasses,
  });

  let prevOffset = 0;
  useFrame(({ mouse }, delta) => {
    scrollData.offset = progress.get();

    if (hovered && selectedImage) {
      const x = (mouse.x * data.width) / 2;
      const y = (mouse.y * data.height) / 2;
      setOffset({ x, y });
    }

    // ? Scale Up On Scroll Animation
    // if (groupRef?.current) {
    //   groupRef.current.position.z = THREE.MathUtils.damp(
    //     groupRef.current.position.z,
    //     Math.max(0, scrollData.delta * 40),
    //     4,
    //     delta
    //   );
    // }
    if (imageRef?.current) {
      // ? Rotate to the scrolling side animation
      // imageRef.current.material.shift = THREE.MathUtils.damp(
      //   imageRef.current.material.shift,
      //   prevOffset > scrollData.offset
      //     ? -scrollData.delta * 10
      //     : scrollData.delta * 10,
      //   4,
      //   delta
      // );
      prevOffset = scrollData.offset;

      imageRef.current.material.mouseoffset[0] = THREE.MathUtils.damp(
        imageRef.current.material.mouseoffset[0],
        selectedImage && hovered ? offset.x : 0,
        4,
        delta
      );
      imageRef.current.material.mouseoffset[1] = THREE.MathUtils.damp(
        imageRef.current.material.mouseoffset[1],
        offset.y,
        4,
        delta
      );

      imageRef.current.material.hover = THREE.MathUtils.damp(
        imageRef.current.material.hover,
        imageHoverGlitchAnimation ? 1 : 0,
        2,
        delta
      );

      imageRef.current.material.grayscale = THREE.MathUtils.damp(
        imageRef.current.material.grayscale,
        hovered || selectedImage?.index === uniqueIndex
          ? Math.max(0, 1 - delta * 10000)
          : Math.max(0, 1 - scrollData.delta * 1000),
        4,
        delta
      );

      // ? OnScroll Zooming animation
      // imageRef.current.material.zoom = THREE.MathUtils.damp(
      //   imageRef.current.material.zoom,
      //   selectedImage && hovered ? 1.5 : Math.max(0, 1 - scrollData.delta * 5),
      //   4,
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
        hovered,
        animateXTo: selectedImagePosition,
      });
    }
  });

  return (
    <group
      // onClick={onClickAction}
      onPointerOver={onPointerOverAction}
      onPointerOut={onPointerOutAction}
      ref={groupRef}
    >
      {/* <ArtworkDescription
        triggerExitAnimation={triggerExitAnimation}
        uniqueIndex={uniqueIndex}
        positionXMax={positionXMax}
      /> */}
      <ImageImpl onPointerMove={onPointerMoveAction} ref={imageRef} url={url} />
      <CloseIcon
        data={data}
        w={w}
        uniqueIndex={uniqueIndex}
        setTriggerExitAnimation={setTriggerExitAnimation}
      />
    </group>
  );
};
