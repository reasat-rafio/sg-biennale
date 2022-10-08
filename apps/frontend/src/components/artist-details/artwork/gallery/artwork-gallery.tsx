import { sliceIntoChunks } from "@lib/helpers/global.helpers";
import { Scroll, ScrollControls } from "@lib/helpers/scroll-controls.helper";
import {
  animationFrameEffect,
  useIntersection,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import useArtistsDetailsStore from "@stores/artist-details.store";
import {
  PointerEvent,
  Suspense,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArtworkPageProps } from "../artwork";
import { Pages } from "./pages";

export interface ArtworkGalleryProps {
  artworks: ArtworkPageProps["artworks"];
}

export const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ artworks }) => {
  let myTimeout: NodeJS.Timeout | null = null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const windowHeight = useWindowSize()?.height ?? 0;
  const windowWidth = useWindowSize()?.width ?? 0;
  const { galleryImagePerPage } = useArtistsDetailsStore();
  const { selectedImage } = useArtistsDetailsStore();
  const _artworks = sliceIntoChunks(artworks, galleryImagePerPage);
  const [scrollPassRatio, setScrollPassRatio] = useState(0);
  const [isDown, setDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [pages, setPages] = useState(
    () => artworks.length / galleryImagePerPage
  );
  // + 0.5
  console.log("====================================");
  console.log(pages);
  console.log("====================================");
  const onPointerDownAction = (e: PointerEvent<HTMLDivElement>) => {
    // if (!selectedImage)
    myTimeout = setTimeout(() => {
      setDown(true);
      if (sectionRef?.current) sectionRef.current!.style.cursor = "grabbing";
      setStartX(e.pageX - sectionRef?.current!.offsetLeft);
    }, 100);
  };
  const onPointerLeaveAction = () => {
    if (myTimeout) clearTimeout(myTimeout);
    setDown(false);
    if (sectionRef?.current) sectionRef.current!.style.cursor = "auto";
  };
  const onPointerUpAction = () => {
    if (myTimeout) clearTimeout(myTimeout);
    setDown(false);
    if (sectionRef?.current) sectionRef.current!.style.cursor = "auto";
  };
  const onPointerMoveAction = (e: PointerEvent<HTMLDivElement>) => {
    // if (!selectedImage) {
    if (!isDown) return;
    const x = e.pageX - sectionRef?.current!.offsetLeft;
    const walk = (x - startX) * 0.00001 * -5;
    setOffsetX((prev) => Math.max(0, Math.min(2, prev + walk)));
    // }
  };
  const onTouchStartAction = (e: TouchEvent) => {
    setDown(true);
    setStartX(e.touches[0].pageX - sectionRef?.current!.offsetLeft);
  };
  const onTouchEndAction = () => setDown(false);
  const onTouchMoveAction = (e: TouchEvent) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - sectionRef?.current!.offsetLeft;
    const walk = (x - startX) * 0.00001 * -5;
    setOffsetX((prev) => Math.max(0, Math.min(2, prev + walk)));
  };

  // useVisibleScrollEffect(
  //   sectionRef,
  //   (offsetBoundingRect, _, y) =>
  //     animationFrameEffect(() => {
  //       if (!selectedImage) {
  //         if (windowWidth >= 1024) {
  //           const yDelta = y + windowHeight - offsetBoundingRect.top;
  //           const ratio = Math.max(0, Math.min(yDelta / windowHeight));
  //           setScrollPassRatio(ratio);
  //         } else {
  //           setScrollPassRatio(-0.3);
  //         }
  //       }
  //     }),
  //   [windowHeight, selectedImage]
  // );

  return (
    <section
      ref={sectionRef}
      className="h-[100vh]"
      id="artwork-gallery-container"
    >
      <Canvas
        ref={canvasRef}
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        onTouchStart={onTouchStartAction}
        onTouchEnd={onTouchEndAction}
        onTouchMove={onTouchMoveAction}
        onPointerDown={onPointerDownAction}
        onPointerLeave={onPointerLeaveAction}
        onPointerUp={onPointerUpAction}
        onPointerMove={onPointerMoveAction}
      >
        <Suspense fallback={null}>
          <ScrollControls
            horizontal
            damping={4}
            pages={pages}
            distance={1}
            enabled={false}
          >
            <Scroll>
              <Pages
                offsetX={offsetX}
                isDown={isDown}
                pages={pages}
                myTimeout={myTimeout}
                scrollPassRatio={scrollPassRatio}
                setScrollPassRatio={setScrollPassRatio}
                artworks={_artworks}
                setDown={setDown}
                setOffsetX={setOffsetX}
              />
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </section>
  );
};
