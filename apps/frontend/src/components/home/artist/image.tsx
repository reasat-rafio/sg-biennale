import { ICountry } from "@lib/@types/global.types";
import { Html, Image, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { damp } from "./util";
import { a, useSpring } from "@react-spring/three";

interface imageProps {
  index: number;
  position: any;
  scale: any;
  url: string;
  length: number;
  name: string;
  countries: ICountry[];
  clicked: null | number;
  scrollPassRatio: number;
  setClikced: Dispatch<SetStateAction<null | number>>;
}

export const Image_: React.FC<imageProps> = ({
  index,
  position,
  scale,
  url,
  length,
  clicked,
  name,
  countries,
  scrollPassRatio,
  setClikced,
}) => {
  const color = new THREE.Color();
  const imageRef = useRef<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scroll = useScroll();
  const [hovered, hover] = useState(false);

  const click = () =>
    index === clicked ? setClikced(null) : setClikced(index);
  const over = () => hover(true);
  const out = () => hover(false);

  const { progress } = useSpring({ progress: scrollPassRatio * 0.1 });
  useFrame((_, delta) => {
    const y = scroll.curve(index / length - 1.5 / length, 4 / length);
    scroll.offset = progress.get();

    // Scale Y
    if (imageRef?.current) {
      imageRef.current.material.scale[1] = imageRef.current.scale.y = damp(
        imageRef.current.scale.y,
        clicked === index ? 6 : 4.5 + y,
        8,
        delta
      );
      // Scale X
      imageRef.current.material.scale[0] = imageRef.current.scale.x = damp(
        imageRef.current.scale.x,
        clicked === index ? 6 : scale[0],
        6,
        delta
      );
      if (clicked !== null && index < clicked) {
        imageRef.current.position.x = damp(
          imageRef.current.position.x,
          position[0] - 1.2,
          6,
          delta
        );
      }
      if (clicked !== null && index > clicked)
        imageRef.current.position.x = damp(
          imageRef.current.position.x,
          position[0] + 1.2,
          6,
          delta
        );
      if (clicked === null || clicked === index)
        imageRef.current.position.x = damp(
          imageRef.current.position.x,
          position[0],
          6,
          delta
        );
      imageRef.current.material.grayscale = damp(
        imageRef.current.material.grayscale,
        hovered || clicked === index ? 0 : Math.max(0, 1 - y),
        6,
        delta
      );
      imageRef.current.material.color.lerp(
        color.set(hovered || clicked === index ? "white" : "#aaa"),
        hovered ? 0.3 : 0.1
      );
    }
  });
  return (
    <a.group
      // progress={progress}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
    >
      <Image scale={scale} position={position} ref={imageRef} url={url} />
      <Html
        className="pointer-events-none -translate-x-[50%]"
        position={position}
        scale={scale}
      >
        <div
          className={clsx(
            "duration-500 transition-all w-[200px]  text-white font-manrope ",
            clicked !== null && index > clicked && "!translate-x-full",
            clicked !== null && index < clicked && "!-translate-x-full"
          )}
          ref={contentRef}
        >
          <h6 className="text-white font-bold text-[24px]">{name}</h6>
          <span>
            {countries.map(({ label }) => (
              <span>{label} ,</span>
            ))}
          </span>
        </div>
      </Html>
    </a.group>
  );
};
