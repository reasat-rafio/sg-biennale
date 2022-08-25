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
  const { selectedImage, setSelectedImage, galleryImagePerPage } =
    useArtistsDetailsStore();
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
    if (uniqueIndex !== selectedImage?.index)
      setSelectedImage({ index: uniqueIndex, artwork: artwork });
    else setSelectedImage(null);
  };

  useEffect(() => {
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

      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        selectedImage?.index === uniqueIndex
          ? outterArrIndex !== 0
            ? scrollData.offset * data.width + -data.width * w * 2.5
            : scrollData.offset * data.width
          : position[0],
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

      imageRef.current.material.scale[0] = imageRef.current.scale.x =
        THREE.MathUtils.damp(
          imageRef.current.scale.x,
          selectedImage?.index === uniqueIndex ? scale[0] * 1.2 : scale[0],
          6,
          delta
        );
      imageRef.current.material.scale[1] = imageRef.current.scale.y =
        THREE.MathUtils.damp(
          imageRef.current.scale.y,
          selectedImage?.index === uniqueIndex ? scale[1] * 1.2 : scale[1],
          8,
          delta
        );
      imageRef.current.position.z = THREE.MathUtils.damp(
        imageRef.current.position.z,
        selectedImage?.index === uniqueIndex ? 1 : position[2],
        4,
        delta
      );
      imageRef.current.position.y = THREE.MathUtils.damp(
        imageRef.current.position.y,
        selectedImage?.index === uniqueIndex ? 1 : position[1],
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
      <Html className="">
        <AnimatePresence>
          {selectedImage?.index === uniqueIndex && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black w-[1000px] -translate-x-1/2 p-6 text-white bg-opacity-90 rounded-lg space-y-6 "
            >
              <h2 className="text-4xl font-semibold">
                {selectedImage.artwork.name}
              </h2>

              <div>
                <PortableText blocks={selectedImage.artwork.description} />
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
