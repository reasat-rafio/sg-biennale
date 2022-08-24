import { useThree } from "@react-three/fiber";
import { ArtworkGalleryProps } from "./artwork-gallery";

export const Pages: React.FC<ArtworkGalleryProps> = ({ artworks }) => {
  const { width } = useThree((state) => state.viewport);

  return <group></group>;
};
