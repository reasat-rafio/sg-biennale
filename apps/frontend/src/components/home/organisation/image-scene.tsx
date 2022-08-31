import * as THREE from "three";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSpring, a } from "@react-spring/three";
import vertexShader from "./shaders/vertex-shader.glsl";
import fragmentShader from "./shaders/fragment-shader.glsl";
import { Html } from "@react-three/drei";

const Image: React.FC<{
  selectedImg: string;
  prevSelectedImg: string;
}> = ({ selectedImg, prevSelectedImg }) => {
  const { viewport } = useThree();
  const [doAnimation, setDoAnimation] = useState(false);
  const { progress } = useSpring({ progress: doAnimation ? 0.5 : 0 });

  useEffect(() => {
    if (prevSelectedImg !== selectedImg) {
      setDoAnimation(true);
      setTimeout(() => {
        setDoAnimation(false);
      }, 400);
    }
  }, [selectedImg]);

  const args = useMemo(() => {
    const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [
      selectedImg,
      prevSelectedImg,
      "/displacement/6.jpg",
    ]);

    dispTexture.wrapS = dispTexture.wrapT = THREE.RepeatWrapping;
    texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
    texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

    return {
      uniforms: {
        effectFactor: { value: 0.55 },
        dispFactor: { value: 0 },
        texture: { value: texture1 },
        texture2: { value: texture2 },
        disp: { value: dispTexture },
      },
      vertexShader,
      fragmentShader,
    };
  }, [selectedImg, prevSelectedImg]);

  return (
    <a.mesh scale={[viewport.width, viewport.height, 1]}>
      <planeBufferGeometry args={[1, 1, 16, 16]} />
      {/* @ts-ignore */}
      <a.shaderMaterial
        name="material"
        args={[args]}
        uniforms-dispFactor-value={progress}
      />
    </a.mesh>
  );
};

const ImageScene: React.FC<{
  selectedImg: string;
  prevSelectedImg: string;
}> = ({ selectedImg, prevSelectedImg }) => {
  return (
    <Canvas
      gl={(canvas) => new THREE.WebGL1Renderer({ canvas, alpha: true })}
      camera={{ fov: 16, position: [0, 0, 3] }}
    >
      <Suspense
        fallback={
          <Html prepend center>
            <p>Loading..</p>
          </Html>
        }
      >
        <Image prevSelectedImg={prevSelectedImg} selectedImg={selectedImg} />
      </Suspense>
    </Canvas>
  );
};

export default ImageScene;
