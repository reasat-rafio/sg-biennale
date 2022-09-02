import { ICountry, Slug } from "@lib/@types/global.types";
import { Html, Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { damp } from "./util";
import { a, config, useSpring } from "@react-spring/three";
import { motion } from "framer-motion";
import { NextRouter } from "next/router";
import { useScroll } from "@lib/helpers/scroll-controls-helper";

interface imageProps {
  index: number;
  position: any;
  scale: any;
  url: string;
  length: number;
  name: string;
  countries: ICountry[];
  clicked: null | number;
  offsetX: number;
  slug: Slug;
  myTimeout: NodeJS.Timeout | null;
  router: NextRouter;
  scrollPassRatio: number;
  isDown: boolean;
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
  offsetX,
  slug,
  isDown,
  myTimeout,
  router,
  scrollPassRatio,
  setClikced,
}) => {
  const color = new THREE.Color();
  const imageRef = useRef<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scroll = useScroll();
  const [hovered, hover] = useState(false);

  const y = scroll.curve(index / length - 1.5 / length, 4 / length);
  const { progress } = useSpring({
    progress: Math.min(scrollPassRatio * 0.1 + offsetX * 2, 1),
    config: config.slow,
  });

  const click = () => {
    if (myTimeout) clearTimeout(myTimeout);
    if (index === clicked) {
      setClikced(null);
    } else if (!isDown) {
      setClikced(index);
    }
  };
  const over = () => hover(true);
  const out = () => hover(false);

  useFrame((_, delta) => {
    scroll.offset = progress.get();
    // Scale Y
    if (imageRef?.current) {
      imageRef.current.material.scale[1] = imageRef.current.scale.y = damp(
        imageRef.current.scale.y,
        clicked === index ? scale[1] + scale[1] * 0.4 : scale[1],
        8,
        delta
      );
      // Scale X
      imageRef.current.material.scale[0] = imageRef.current.scale.x = damp(
        imageRef.current.scale.x,
        clicked === index ? scale[0] + scale[0] * 0.4 : scale[0],
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

      imageRef.current.material.color.lerp(color.set("white"), hovered ? 1 : 0);
    }
  });

  return (
    <a.group onClick={click} onPointerOver={over} onPointerOut={out}>
      <Image ref={imageRef} scale={scale} position={position} url={url} />
      <Html
        className="pointer-events-none -translate-x-[50%]"
        position={position}
        scale={scale}
      >
        <motion.div
          ref={contentRef}
          className={clsx(
            "duration-500 transition-all w-[200px]  text-white font-manrope pointer-events-none cursor-pointer",
            clicked !== null && index > clicked && "!translate-x-full",
            clicked !== null && index < clicked && "!-translate-x-full"
          )}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            router.push(`/artists/${slug.current}`);
          }}
        >
          <h6 className="text-white font-bold text-[24px]">{name}</h6>
          <span>
            {countries.map(({ label }) => (
              <span>{label} ,</span>
            ))}
          </span>
        </motion.div>
      </Html>
    </a.group>
  );
};
