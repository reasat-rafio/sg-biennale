import { sliceIntoChunks } from "@lib/helpers/global.helpers";
import { Scroll, ScrollControls } from "@lib/helpers/scroll-controls-helper";
import { useIntersection } from "@lib/hooks";
import { Html, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import { Suspense, useEffect, useRef, useState } from "react";
import { ArtworkPageProps } from "../artwork";
import { Pages } from "./pages";

export interface ArtworkGalleryProps {
  artworks: ArtworkPageProps["artworks"];
}

export const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ artworks }) => {
  const { galleryImagePerPage } = useArtistsDetailsStore();
  const { galleryIsScrollable, selectedImage, setGalleryIsScrollable } =
    useArtistsDetailsStore();
  const _artworks = sliceIntoChunks(artworks, galleryImagePerPage);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pages, setPages] = useState(
    () => artworks.length / galleryImagePerPage + 0.5
  );

  const intersection = useIntersection(canvasRef, { threshold: 0.8 });

  useEffect(() => {
    if (selectedImage) {
      setGalleryIsScrollable(false);
      document.body.style.position = "fixed";
      window.scrollTo({
        top: canvasRef.current!.getBoundingClientRect().top,
        behavior: "smooth",
      });
    } else {
      document.body.style.position = "static";
      setGalleryIsScrollable(true);
    }
  }, [selectedImage, intersection?.isIntersecting]);

  return (
    <Canvas ref={canvasRef} gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls
          horizontal
          damping={4}
          pages={pages}
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
