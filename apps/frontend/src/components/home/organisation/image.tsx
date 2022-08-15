import * as THREE from "three";
// @ts-ignore
import glsl from "babel-plugin-glsl/macro";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSpring, a } from "@react-spring/three";

const vertexShader = glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

const fragmentShader = glsl`
  varying vec2 vUv;
  uniform sampler2D texture;
  uniform sampler2D texture2;
  uniform sampler2D disp;
  uniform float _rot;
  uniform float dispFactor;
  uniform float effectFactor;

  void main() {
    vec2 uv = vUv;
    vec4 disp = texture2D(disp, uv);

    vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

    vec4 _texture = texture2D(texture, distortedPosition);
    vec4 _texture2 = texture2D(texture2, distortedPosition);

    vec4 finalTexture = mix(_texture, _texture2, dispFactor);

    gl_FragColor = finalTexture;
  }
  `;

const Wave: React.FC<{
  selectedLogo: string;
  prevSelectedLogo: string;
}> = ({ selectedLogo, prevSelectedLogo }) => {
  const [state, setState] = useState(false);

  const { progress } = useSpring({ progress: state ? 0.5 : 0 });

  useEffect(() => {
    if (prevSelectedLogo !== selectedLogo) {
      setState(true);
      setTimeout(() => {
        setState(false);
      }, 400);
    }
  }, [selectedLogo]);

  const args = useMemo(() => {
    const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [
      selectedLogo,
      prevSelectedLogo,
      "/displacement/10.jpg",
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
  }, [selectedLogo, prevSelectedLogo]);

  return (
    <a.mesh>
      <planeBufferGeometry args={[1, 0.7, 16, 16]} />
      {/* @ts-ignore */}
      <a.shaderMaterial
        name="material"
        args={[args]}
        uniforms-dispFactor-value={progress}
      />
    </a.mesh>
  );
};

const Scene: React.FC<{
  selectedLogo: string;
  prevSelectedLogo: string;
}> = ({ selectedLogo, prevSelectedLogo }) => {
  return (
    <Canvas
      gl={(canvas) => new THREE.WebGL1Renderer({ canvas })}
      camera={{ fov: 12, position: [0, 0, 5] }}
    >
      <Suspense fallback={null}>
        <Wave prevSelectedLogo={prevSelectedLogo} selectedLogo={selectedLogo} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
