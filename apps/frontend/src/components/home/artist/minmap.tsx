import * as THREE from "three";
import { SVGProps, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { damp } from "./util";

const material = new THREE.LineBasicMaterial({ color: "#000000" });
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.5, 0),
  new THREE.Vector3(0, 0.5, 0),
]);

export const Minimap: React.FC<{ length: number }> = ({ length }) => {
  const ref = useRef<any>(null);
  const scroll = useScroll();
  const { height } = useThree((state) => state.viewport);
  useFrame((_, delta) => {
    if (ref?.current) {
      ref.current.children.forEach(
        (child: SVGProps<SVGLineElement>, index: number) => {
          // Give me a value between 0 and 1
          //   starting at the position of my item
          //   ranging across 4 / total length
          //   make it a sine, so the value goes from 0 to 1 to 0.
          const y = scroll.curve(index / length - 1.5 / length, 4 / length);
          (child.scale as any).y = damp(
            (child.scale as any).y,
            0.1 + y / 6,
            8,
            delta
          );
        }
      );
    }
  });
  return (
    <group ref={ref}>
      {Array.from({ length }).map((_, i) => (
        <line
          key={i}
          // @ts-ignore
          geometry={geometry}
          material={material}
          position={[i * 0.06 - length * 0.03, -height / 2 + 0.6, 0]}
        />
      ))}
    </group>
  );
};
