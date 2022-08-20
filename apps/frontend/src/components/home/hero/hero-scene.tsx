import {
  Canvas,
  useFrame,
  useLoader,
  Vector2 as Vec2,
} from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { SanityImage } from "sanity-react-extra";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { ShaderMaterial, TextureLoader, Vector2, WebGL1Renderer } from "three";
import { useWindowSize } from "@lib/hooks";

interface HeroSceneProps {
  image: SanityImage;
  coords: Vec2;
}

const HeroImage: React.FC<HeroSceneProps> = ({ image, coords }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const windowHeight = useWindowSize()?.height ?? 0;

  const meshRef = useRef<ShaderMaterial>(null);

  const args = useMemo(() => {
    const [img] = useLoader(TextureLoader, [image.asset.url]);

    return {
      uniforms: {
        uTexture: { value: img },
        uCoords: { value: coords },
        uRes: { value: new Vector2(windowWidth, windowHeight) },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    };
  }, []);

  useFrame(({ clock }) => {
    if (meshRef?.current) {
      meshRef.current.uniforms.uCoords = { value: coords };
      meshRef.current.uniforms.uTime = { value: clock.getElapsedTime() };
    }
  });

  return (
    <mesh>
      <planeBufferGeometry args={[1, 0.7, 16, 16]} />
      <shaderMaterial ref={meshRef} name="material" args={[args]} />
    </mesh>
  );
};

const HeroScene: React.FC<HeroSceneProps> = ({ image, coords }) => {
  return (
    <Canvas
      gl={(canvas) => new WebGL1Renderer({ canvas, alpha: true })}
      camera={{ fov: 16, position: [0, 0, 3] }}
    >
      <Suspense fallback={null}>
        <ambientLight args={["#eeeeee", 0.6]} />
        <HeroImage coords={coords} image={image} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
