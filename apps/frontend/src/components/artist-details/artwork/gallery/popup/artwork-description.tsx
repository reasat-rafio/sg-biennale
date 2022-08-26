import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import { Suspense } from "react";
import { ScrollControls, Scroll } from "../scroll-controls";
import { PageContent } from "./page-content";

interface ArtworkDescriptionProps {}

export const ArtworkDescription: React.FC<ArtworkDescriptionProps> = ({}) => {
  const { setSelectedImage } = useArtistsDetailsStore();

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-80 z-50"
      onClick={() => setSelectedImage(null)}
    >
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls
            horizontal
            damping={4}
            pages={1}
            distance={1}
            enabled={false}
          >
            <Scroll>
              <PageContent />
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </div>
  );
};
