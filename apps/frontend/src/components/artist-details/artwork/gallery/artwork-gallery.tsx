import { sliceIntoChunks } from "@lib/helpers/global.helpers";
import { Preload } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import { Suspense, useRef } from "react";
import { ArtworkPageProps } from "../artwork";
import { Pages } from "./pages";
import { Scroll, ScrollControls } from "./scroll-controls";

export interface ArtworkGalleryProps {
  artworks: ArtworkPageProps["artworks"];
}

export const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ artworks }) => {
  const { galleryImagePerPage } = useArtistsDetailsStore();

  const { galleryIsScrollable, setSelectedImage } = useArtistsDetailsStore();
  const _artworks = sliceIntoChunks(artworks, galleryImagePerPage);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pages = artworks.length / galleryImagePerPage;

  return (
    <Canvas
      ref={canvasRef}
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      onPointerMissed={() => setSelectedImage(null)}
    >
      <Suspense fallback={null}>
        <ScrollControls
          horizontal
          damping={4}
          pages={Math.ceil(pages)}
          distance={1}
          enabled={galleryIsScrollable}
        >
          <Scroll>
            <Pages pages={pages} artworks={_artworks} />
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
};
