import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { SanityImage } from "sanity-react-extra";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { TextureLoader, WebGL1Renderer } from "three";

interface HeroSceneProps {
  image: SanityImage;
}

const HeroImage: React.FC<HeroSceneProps> = ({ image }) => {
  const args = useMemo(() => {
    const [img] = useLoader(TextureLoader, [image.asset.url]);

    return {
      uniforms: {
        uTexture: { value: img },
      },
      vertexShader,
      fragmentShader,
    };
  }, []);

  return (
    <mesh>
      <planeBufferGeometry args={[1, 0.7, 16, 16]} />
      <shaderMaterial name="material" args={[args]} />
    </mesh>
  );
};

const HeroScene: React.FC<HeroSceneProps> = ({ image }) => {
  return (
    <Canvas
      gl={(canvas) => new WebGL1Renderer({ canvas, alpha: true })}
      camera={{ fov: 16, position: [0, 0, 3] }}
    >
      <Suspense fallback={null}>
        <HeroImage image={image} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
