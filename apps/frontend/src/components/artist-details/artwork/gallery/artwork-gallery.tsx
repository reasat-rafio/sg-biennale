import { sliceIntoChunks } from "@lib/helpers/global.helpers";
import { Html, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { ArtworkPageProps } from "../artwork";
import { Pages } from "./pages";
import { Scroll, ScrollControls } from "./scroll-controls";

export interface ArtworkGalleryProps {
  artworks: ArtworkPageProps["artworks"];
}

export const imagePerPageView = 6;
export const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ artworks }) => {
  const _artworks = sliceIntoChunks(artworks, imagePerPageView);

  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls
          horizontal
          damping={4}
          pages={artworks.length / imagePerPageView + 0.5}
          distance={1}
        >
          <Scroll>
            <Pages artworks={_artworks} />
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
};
