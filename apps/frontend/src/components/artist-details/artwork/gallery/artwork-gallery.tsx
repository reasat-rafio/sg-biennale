import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ArtworkPageProps } from "../artwork";
import { Pages } from "./pages";
import { Scroll, ScrollControls } from "./scroll-controls";

export interface ArtworkGalleryProps {
  artworks: ArtworkPageProps["artworks"];
}

export const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ artworks }) => {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls horizontal damping={4} pages={2.2} distance={1}>
          <Scroll>
            <Pages artworks={artworks} />
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
};
