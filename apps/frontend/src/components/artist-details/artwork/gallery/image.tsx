import { Html, Image as ImageImpl } from "@react-three/drei";
import { useWindowSize } from "@lib/hooks";
import { useFrame, useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import * as THREE from "three";
import { useScroll } from "./scroll-controls";
import { AnimatePresence, motion } from "framer-motion";
import { ArtworkProps } from "../artwork";
import { PortableText } from "@utils/sanity";
import {
  opacityController,
  positionController,
  scalingController,
} from "@lib/helpers/artist-details.helpers";
import { ArtworkDescription } from "./artwork-description";

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
  const {
    selectedImage,
    setSelectedImage,
    galleryImagePerPage,
    setGalleryIsScrollable,
  } = useArtistsDetailsStore();
  const imageRef = useRef<any>(null);
  const group = useRef<Group | null>(null);
  const scrollData = useScroll();
  const [hovered, setHovered] = useState(false);
  const [triggerExitAnimation, setTriggerExitAnimation] = useState(false);
  const data = useThree((state) => state.viewport);
  const w = scrollData.pages / galleryImagePerPage;
  const uniqueIndex = outterArrIndex * 10 + innerArrIndex;

  const onClickAction = () => {
    if (!selectedImage) {
      setSelectedImage({ index: uniqueIndex, artwork: artwork });
    }
    // setGalleryIsScrollable(false);
    // scrollData
    // setSelectedImage(null);
    // setGalleryIsScrollable(true);
    // document.body.style.position = "static";
  };

  useEffect(() => {
    if (!selectedImage) {
      // document.body.style.cursor = hovered ? "pointer" : "auto";
      // setGalleryIsScrollable(false);
    } else {
      // setGalleryIsScrollable(true);
    }
  }, [hovered]);

  useFrame((_, delta) => {
    if (group?.current) {
      group.current.position.z = THREE.MathUtils.damp(
        group.current.position.z,
        Math.max(0, scrollData.delta * 40),
        4,
        delta
      );
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

      imageRef.current.material.zoom = THREE.MathUtils.damp(
        imageRef.current.material.zoom,
        hovered ? 1.05 : Math.max(0, 1 - scrollData.delta * 5),
        4,
        delta
      );

      opacityController({ imageRef, selectedImage, delta, uniqueIndex });
      scalingController({
        imageRef,
        scale,
        delta,
        uniqueIndex,
        selectedImage,
      });
      positionController({
        groupRef: group,
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
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      ref={group}
    >
      <Html
        position={[positionXMax - 5.5, 0, 0]}
        className="w-[75vw] flex justify-center items-center"
      >
        <ArtworkDescription
          triggerExitAnimation={triggerExitAnimation}
          uniqueIndex={uniqueIndex}
        />
      </Html>
      <ImageImpl ref={imageRef} url={url} />
      {selectedImage?.index === uniqueIndex && (
        <Html
          className="w-6 h-6"
          position={[(data.width * w) / 2 + 0.5, data.height / 2.5, 0]}
        >
          <motion.img
            onClick={() => {
              setTriggerExitAnimation(true);
              setTimeout(() => {
                setTriggerExitAnimation(false);
                setSelectedImage(null);
              }, 1200);
            }}
            className="h-10 w-10 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 1 } }}
            src="/icons/cross.svg"
            alt="close icon"
          />
        </Html>
      )}
    </group>
  );
};
