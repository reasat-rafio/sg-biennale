import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

interface ArtworkGalleryProps {}

export const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({}) => {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}></Suspense>
    </Canvas>
  );
};
