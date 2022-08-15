import { useThree } from "@react-three/fiber";
import clsx from "clsx";
import { StaticImageData } from "next/image";
import { useMemo } from "react";
import * as THREE from "three";
import disp from "../../../../public/displacement/12.jpg";
import { vertexShader, fragmentShader } from "./shaders/XFadeShader";

interface ImageProps {
  image: string;
  prevImage: string;
}

const loader = new THREE.TextureLoader();

export const ImageWebGl: React.FC<ImageProps> = ({ image, prevImage }) => {
  const { invalidate } = useThree();

  const args = useMemo(() => {
    const texture1 = loader.load(prevImage, invalidate as any);
    const texture2 = loader.load(image, invalidate as any);
    const dispTexture = loader.load(disp as any, invalidate as any);

    dispTexture.wrapS = dispTexture.wrapT = THREE.RepeatWrapping;
    texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
    texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

    return {
      uniforms: {
        effectFactor: { type: "f", value: 0.9 },
        dispFactor: { type: "f", value: 0 },
        texture: { type: "t", value: texture1 },
        texture2: { type: "t", value: texture2 },
        disp: { type: "t", value: dispTexture },
      },
      vertexShader,
      fragmentShader,
    };
  }, [image, prevImage, disp, invalidate]);

  return <div className={clsx()}></div>;
};
