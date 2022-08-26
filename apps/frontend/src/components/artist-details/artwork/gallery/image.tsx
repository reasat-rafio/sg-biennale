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

interface ImageProps {
  outterArrIndex: number;
  innerArrIndex: number;
  position: any;
  scale: any;
  url: string;
  artwork: ArtworkProps;
}

export const Image: React.FC<ImageProps> = ({
  innerArrIndex,
  outterArrIndex,
  position,
  scale,
  url,
  artwork,
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
  const data = useThree((state) => state.viewport);

  const w =
    data.width < 10
      ? 2 / galleryImagePerPage
      : scrollData.pages / galleryImagePerPage;

  const uniqueIndex = outterArrIndex * 10 + innerArrIndex;

  const onClickAction = () => {
    if (!selectedImage) {
      setSelectedImage({ index: uniqueIndex, artwork: artwork });
      setTimeout(() => {
        document.body.style.position = "fixed";
        setGalleryIsScrollable(false);
      }, 1000);
    } else if (uniqueIndex === selectedImage?.index) {
      setSelectedImage(null);
      setGalleryIsScrollable(true);
      document.body.style.position = "static";
    }
  };

  useEffect(() => {
    if (!selectedImage)
      document.body.style.cursor = hovered ? "pointer" : "auto";
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
      setTimeout(() => {
        positionController({
          groupRef: group,
          imageRef,
          selectedImage,
          uniqueIndex,
          position,
          delta,
          animateXTo: data.width * w - data.width * 0.1,
        });
      }, 500);
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
      <Html
        position={[-12, 1, 0]}
        className="w-[75vw] flex justify-center items-center"
      >
        <AnimatePresence>
          {selectedImage?.index === uniqueIndex && (
            <motion.div className=" p-6 space-y-6 max-w-3xl">
              <motion.div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 1,
                    type: "tween",
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="text-4xl text-black font-semibold"
                >
                  {selectedImage.artwork.name}
                </motion.h2>
              </motion.div>

              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 1,
                    type: "tween",
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                >
                  <PortableText blocks={selectedImage.artwork.description} />
                </motion.div>
              </div>
              <button className="bg-[#FFFFFF] text-black rounded-3xl px-10 py-3 w-fit">
                See Venue
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Html>
    </group>
  );
};
