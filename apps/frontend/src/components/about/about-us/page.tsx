import { useFrame, useThree } from "@react-three/fiber";
import { AboutCollection } from "@lib/@types/about.types";
import { Image } from "@react-three/drei";
import { config, useSpring } from "@react-spring/three";
import { useScroll } from "@lib/helpers/scroll-controls-helper";

interface PageProps extends AboutCollection {
  index: number;
  scrollPassRatio: number;
}
const gap = 0.2;
export const Page: React.FC<PageProps> = ({
  image,
  index,
  scrollPassRatio,
}) => {
  const data = useThree((state) => state.viewport);
  const scale: any = [data.width - gap, data.height, 5];
  const scroll = useScroll();
  const { progress } = useSpring({
    progress: Math.min(scrollPassRatio * 2, 1),
    config: config.molasses,
  });

  useFrame(() => {
    scroll.offset = progress.get();
  });

  return (
    <group position={[data.width * index, 0, 0]}>
      <Image scale={scale} url={image.asset.url} />
    </group>
  );
};
