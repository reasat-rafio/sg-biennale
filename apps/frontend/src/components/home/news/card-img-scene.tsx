import { Html } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { Color, ShaderMaterial, TextureLoader, WebGL1Renderer } from "three";
import vertexShader from "./shaders/vartex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

interface CardImgSceneProps {
  url: string;
}

const Image: React.FC<{
  url: string;
}> = ({ url }) => {
  const [doAnimation, setDoAnimation] = useState(false);
  const materialRef = useRef<ShaderMaterial>(null);

  const args = useMemo(() => {
    const [imgTexture] = useLoader(TextureLoader, [url]);

    return {
      uniforms: {
        uTexture: { value: imgTexture },
        uTime: { value: 0 },
        uColor: { value: new Color(0.0, 0.0, 0.0) },
      },
      vertexShader,
      fragmentShader,
    };
  }, [url]);

  useFrame(({ clock }) => {
    if (materialRef?.current) {
      materialRef.current.uniforms.uTime = { value: clock.getElapsedTime() };
    }
  });

  return (
    <mesh>
      <planeBufferGeometry args={[1, 0.6, 16, 16]} />
      <shaderMaterial ref={materialRef} name="material" args={[args]} />
    </mesh>
  );
};

const CardImgScene: React.FC<CardImgSceneProps> = ({ url }) => {
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
        <Image url={url} />
      </Suspense>
    </Canvas>
  );
};

export default CardImgScene;
