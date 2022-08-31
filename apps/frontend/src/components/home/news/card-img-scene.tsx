import { Html } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  MathUtils,
  ShaderMaterial,
  TextureLoader,
  WebGL1Renderer,
} from "three";
import vertexShader from "./shaders/vartex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useSpring, animated, config } from "@react-spring/three";

interface CardImgSceneProps {
  url: string;
  hovered: boolean;
  scalePos: number[];
}

const Image: React.FC<CardImgSceneProps> = ({ url, hovered, scalePos }) => {
  const { viewport } = useThree();
  const meshRef = useRef<any>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { hoverValue } = useSpring({
    hoverValue: hovered ? 1 : 0,
    config: config.molasses,
  });

  useFrame((_, delta) => {
    meshRef.current.scale.x = MathUtils.damp(
      meshRef.current.scale.x,
      viewport.width - scalePos[0],
      4,
      delta
    );
    meshRef.current.scale.y = MathUtils.damp(
      meshRef.current.scale.y,
      viewport.height + scalePos[1],
      4,
      delta
    );
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
    <animated.mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeBufferGeometry args={[1, 1, 16, 16]} />
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
  scalePos,
}) => {
  return (
    <Canvas
      gl={(canvas) => new WebGL1Renderer({ canvas, alpha: true })}
      camera={{ fov: 16, position: [0, 0, 3] }}
    >
      <Suspense
        fallback={
          <Html prepend center>
            <p>Loading..</p>
          </Html>
        }
      >
        <Image url={url} scalePos={scalePos} hovered={hovered} />
      </Suspense>
    </Canvas>
  );
};

export default CardImgScene;
