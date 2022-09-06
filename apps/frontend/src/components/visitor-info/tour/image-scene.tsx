import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./shaders/vertexShader.glsl";
import fragmentShader from "./shaders/fragmentShader.glsl";
import { SanityImage } from "sanity-react-extra";

interface ImageSceneProps {
  image: SanityImage;
}

const Image: React.FC<ImageSceneProps> = ({ image }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const args = useMemo(() => {
    const [texture] = useLoader(THREE.TextureLoader, [image.asset.url]);

    return {
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("tomato") },
      },
      vertexShader,
      fragmentShader,
    };
  }, [image]);

  useFrame(({ clock, mouse }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime = { value: clock.getElapsedTime() };
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeBufferGeometry />
      <shaderMaterial ref={materialRef} args={[args]} />
    </mesh>
  );
};

export const ImageScene: React.FC<ImageSceneProps> = ({ image }) => {
  return (
    <Suspense fallback={null}>
      <Canvas
        gl={(canvas) => new THREE.WebGL1Renderer({ canvas, alpha: true })}
        camera={{ fov: 16, position: [0, 0, 3] }}
      >
        <Image image={image} />
      </Canvas>
    </Suspense>
  );
};
