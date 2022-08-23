import { Html } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { ShaderMaterial, TextureLoader, WebGL1Renderer } from "three";
import vertexShader from "./shaders/vartex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useSpring, animated, config, SpringValue } from "@react-spring/three";

interface CardImgSceneProps {
  url: string;
  hovered: boolean;
  cardImageAnimationProps: {
    scale: SpringValue<number[]>;
    pos: SpringValue<number[]>;
  };
}

const Image: React.FC<CardImgSceneProps> = ({
  url,
  hovered,
  cardImageAnimationProps,
}) => {
  const materialRef = useRef<ShaderMaterial>(null);

  const { hoverValue } = useSpring({
    hoverValue: hovered ? 1 : 0,
    config: config.molasses,
  });

  const args = useMemo(() => {
    const [imgTexture] = useLoader(TextureLoader, [url]);

    return {
      uniforms: {
        uTexture: { value: imgTexture },
        uImageAspectRatio: { value: 1.0 },
        uOpacity: { value: 1.0 },
        uHover: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
    };
  }, [url]);

  return (
    // @ts-ignore
    <animated.mesh {...cardImageAnimationProps}>
      <planeBufferGeometry args={[1, 0.6, 16, 16]} />
      {/* @ts-ignore */}
      <animated.shaderMaterial
        transparent
        ref={materialRef}
        name="material"
        args={[args]}
        uniforms-uHover-value={hoverValue}
      />
    </animated.mesh>
  );
};

const CardImgScene: React.FC<CardImgSceneProps> = ({
  url,
  hovered,
  cardImageAnimationProps,
}) => {
  return (
    <Canvas
      gl={(canvas) => new WebGL1Renderer({ canvas, alpha: true })}
      camera={{ fov: 12, position: [0, 0, 5] }}
    >
      <Suspense
        fallback={
          <Html prepend center>
            <p>Loading..</p>
          </Html>
        }
      >
        <Image
          url={url}
          hovered={hovered}
          cardImageAnimationProps={cardImageAnimationProps}
        />
      </Suspense>
    </Canvas>
  );
};

export default CardImgScene;
