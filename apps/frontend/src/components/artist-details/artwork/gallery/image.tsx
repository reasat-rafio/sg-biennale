import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Image as ImageImpl } from "./image-impl";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import {
  opacityHandler,
  positionHandler,
  scalingHandler,
} from "@lib/helpers/artist-details.helpers";
import { ArtworkDescription, CloseIcon } from "./artwork-description";
import { useScroll } from "@lib/helpers/scroll-controls.helper";
import { ImageProps } from "@lib/@types/artist-details.types";
import { useWindowSize } from "@lib/hooks";

export const Image: React.FC<ImageProps> = ({
  innerArrIndex,
  outterArrIndex,
  position,
  scale,
  url,
  artwork,
  isDown,
  setDown,
  progress,
  imgEndPoint,
}) => {
  const {
    selectedImage,
    setSelectedImage,
    galleryImagePerPage,
    setSelectedCollectionIndex,
  } = useArtistsDetailsStore();
  const imageRef = useRef<
    THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | any
  >(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const groupRef = useRef<THREE.Group | null>(null);
  const scrollData = useScroll();
  const [hovered, setHovered] = useState(false);
  const [imageHoverGlitchAnimation, setImageHoverGlitchAnimation] =
    useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [triggerExitAnimation, setTriggerExitAnimation] = useState(false);
  const w = scrollData.pages / galleryImagePerPage;
  const uniqueIndex = outterArrIndex * 10 + innerArrIndex;
  const {
    viewport: { width, height },
  } = useThree((state) => state);

  useEffect(() => {
    if (hovered && !selectedImage) {
      setImageHoverGlitchAnimation(true),
        setTimeout(() => setImageHoverGlitchAnimation(false), 500);
    } else setImageHoverGlitchAnimation(false);
  }, [hovered, selectedImage]);

  const onClickAction = () => {
    if (!selectedImage)
      setSelectedImage({ index: uniqueIndex, artwork: artwork });

    setSelectedCollectionIndex(outterArrIndex);
    setDown(false);
    const galleryContainer = document?.querySelector(
      `#artwork-gallery-container`
    );
    galleryContainer?.scrollIntoView({ behavior: "smooth" });
  };

  const onPointerOverAction = () => {
    setHovered(true);
  };
  const onPointerOutAction = () => {
    setOffset({ x: 10, y: 0 });
    setHovered(false);
  };
  const onPointerMoveAction = (e: ThreeEvent<globalThis.PointerEvent>) => {};

  let prevOffset = 0;
  useFrame(({ mouse }, delta) => {
    scrollData.offset = progress.get() ?? 0;

    // ? Scale Up On Hover Animation
    if (groupRef?.current) {
      if (hovered && selectedImage) {
        setOffset({ x: mouse.x * 2, y: mouse.y * 2 });
      }

      groupRef.current.position.z = THREE.MathUtils.damp(
        groupRef.current.position.z,
        selectedImage?.index === uniqueIndex
          ? 0.4
          : !isDown && hovered
          ? 0.2
          : 0,
        4,
        delta
      );
    }

    if (imageRef?.current) {
      // ? belding the image to the scrolling side animation
      imageRef.current.material.shift = THREE.MathUtils.damp(
        imageRef.current.material.shift,
        prevOffset > scrollData.offset
          ? -scrollData.delta * 0.5
          : scrollData.delta * 0.5,
        4,
        delta
      );
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

      // ? Gray Scale
      // imageRef.current.material.grayscale = THREE.MathUtils.damp(
      //   imageRef.current.material.grayscale,
      //   hovered || selectedImage?.index === uniqueIndex
      //     ? Math.max(0, 1 - delta * 10000)
      //     : Math.max(0, delta * 20),
      //   4,
      //   delta
      // );

      // ? On Hover Zoom Animation
      imageRef.current.material.zoom = THREE.MathUtils.damp(
        imageRef.current.material.zoom,
        !isDown && hovered ? 1.05 : 1,
        4,
        delta
      );

      opacityHandler({ imageRef, selectedImage, delta, uniqueIndex });
      scalingHandler({
        imageRef,
        scale,
        delta,
        uniqueIndex,
        selectedImage,
        windowWidth,
      });
      positionHandler({
        groupRef,
        imageRef,
        selectedImage,
        uniqueIndex,
        position,
        delta,
        hovered,
        animateXTo: imgEndPoint,
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
      {/* <ArtworkDescription
        triggerExitAnimation={triggerExitAnimation}
        uniqueIndex={uniqueIndex}
        positionXMin={positionXMin}
      /> */}
      <ImageImpl onPointerMove={onPointerMoveAction} ref={imageRef} url={url} />
      <CloseIcon
        w={w}
        width={width}
        height={height}
        uniqueIndex={uniqueIndex}
        setTriggerExitAnimation={setTriggerExitAnimation}
      />
    </group>
  );
};
