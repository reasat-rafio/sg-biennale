import { AboutCollection } from "@lib/@types/about.types";
import {
  Scroll,
  ScrollControls,
  useScroll,
} from "@lib/helpers/scroll-controls-helper";
import { Html } from "@react-three/drei";
import { Canvas as ReactCanvas, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Page } from "./page";

interface SectionProps {
  aboutCollection: AboutCollection[];
  scrollPassRatio: number;
}

export const Canvas: React.FC<SectionProps> = ({
  aboutCollection,
  scrollPassRatio,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <ReactCanvas
      className="h-screen"
      ref={canvasRef}
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ScrollControls
          horizontal
          damping={4}
          pages={aboutCollection.length}
          distance={1}
          enabled={false}
        >
          <HTML />
          <Scroll>
            {aboutCollection.map((about, index) => (
              <Page
                scrollPassRatio={scrollPassRatio}
                {...about}
                index={index}
              />
            ))}
          </Scroll>
        </ScrollControls>
      </Suspense>
    </ReactCanvas>
  );
};
const HTML = () => {
  const scroll = useScroll();
  const data = useThree((state) => state.viewport);
  return <Html position={[data.width * scroll.offset, 0, 0]}>aasd</Html>;
};
