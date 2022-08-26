import { Image } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";

interface PageContentProps {}

export const PageContent: React.FC<PageContentProps> = ({}) => {
  const { selectedImage, galleryAnimationVals } = useArtistsDetailsStore();

  return (
    <group position={[0, 0, 0]}>
      <group>
        <Image
          position={galleryAnimationVals?.initialImagePosition}
          scale={galleryAnimationVals?.initialImageScale}
          url={selectedImage?.artwork.images[0].asset.url ?? "/KV 1.png"}
        />
      </group>
    </group>
  );
};
