import { sliceIntoChunks } from "@lib/helpers/global.helpers";
import { Html, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { ArtworkPageProps } from "../artwork";
import { Pages } from "./pages";
import { Scroll, ScrollControls } from "./scroll-controls";

export interface ArtworkGalleryProps {
  artworks: ArtworkPageProps["artworks"];
}

export const imagePerPageView = 6;

export const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ artworks }) => {
  const [clicked, setClikced] = useState<null | number>(null);
  const _artworks = sliceIntoChunks(artworks, imagePerPageView);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      style={{ overflow: "visible" }}
      ref={canvasRef}
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      onPointerMissed={() => setClikced(null)}
    >
      <Suspense fallback={null}>
        <ScrollControls
          horizontal
          damping={4}
          pages={artworks.length / imagePerPageView + 0.5}
          distance={1}
          // enabled={false}
        >
          <Scroll>
            <Pages
              artworks={_artworks}
              clicked={clicked}
              setClikced={setClikced}
            />
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
};
