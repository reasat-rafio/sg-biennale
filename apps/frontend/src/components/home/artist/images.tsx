import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame, useThree, Vector3 } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { Minimap } from "./minmap";
import { state, damp } from "./util";
import { IArtistProps } from "@lib/@types/home.types";

interface ImageProps {
  index: number;
  position: any;
  scale: any;
  url: string;
  length: number;
}
const Image_ = ({ index, position, scale, url, length }: ImageProps) => {
  const c = new THREE.Color();

  const ref = useRef<any>();
  const scroll = useScroll();

  const { clicked } = useSnapshot(state);

  const [hovered, hover] = useState(false);
  const click = () => (state.clicked = index === clicked ? null : index);
  const over = () => hover(true);
  const out = () => hover(false);
  useFrame((_, delta) => {
    const y = scroll.curve(index / length - 1.5 / length, 4 / length);
    ref.current.material.scale[1] = ref.current.scale.y = damp(
      ref.current.scale.y,
      clicked === index ? 5 : 4 + y,
      8,
      delta
    );
    ref.current.material.scale[0] = ref.current.scale.x = damp(
      ref.current.scale.x,
      clicked === index ? 4.7 : scale[0],
      6,
      delta
    );
    if (clicked !== null && index < clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] - 2,
        6,
        delta
      );
    if (clicked !== null && index > clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] + 2,
        6,
        delta
      );
    if (clicked === null || clicked === index)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0],
        6,
        delta
      );
    ref.current.material.grayscale = damp(
      ref.current.material.grayscale,
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      6,
      delta
    );
    ref.current.material.color.lerp(
      c.set(hovered || clicked === index ? "white" : "#aaa"),
      hovered ? 0.3 : 0.1
    );
  });
  return (
    <Image
      ref={ref}
      url={url}
      position={position}
      scale={scale}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
    />
  );
};

interface ImagesProps {
  artists: IArtistProps[];
}
const w = 3;
const gap = 0.15;
export const Images: React.FC<ImagesProps> = ({ artists }) => {
  const { width } = useThree((state) => state.viewport);

  const xW = w + gap;

  return (
    <ScrollControls
      // style={{ overflow: "hidden" }}
      horizontal
      enabled
      damping={10}
      pages={(width - xW + artists.length * xW) / width}
    >
      <Minimap length={artists.length} />
      <Scroll>
        {artists.map(({ artworks }, i) => (
          <Image_
            key={i}
            index={i}
            position={[i * xW, 0, 0]}
            scale={[w, 4, 1]}
            length={artworks.length}
            url={artworks[0].images[0].asset.url}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
};
