import { sliceIntoChunks } from "@lib/helpers/global.helpers";
import { Scroll, ScrollControls } from "@lib/helpers/scroll-controls.helper";
import {
  animationFrameEffect,
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
  const { galleryImagePerPage, setGalleryImagePerPage } =
    useArtistsDetailsStore();
  const { selectedImage } = useArtistsDetailsStore();
  const _artworks = sliceIntoChunks(artworks, galleryImagePerPage);
  const [scrollPassRatio, setScrollPassRatio] = useState(0);
  const [isDown, setDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [pages, setPages] = useState(
    Math.ceil(artworks.length / galleryImagePerPage) + 0.5
  );

  useEffect(() => {
    if (windowWidth >= 1536) setGalleryImagePerPage(6);
    else if (windowWidth >= 1280) setGalleryImagePerPage(5);
    else if (windowWidth >= 1024) setGalleryImagePerPage(4);
    else if (windowWidth >= 768) setGalleryImagePerPage(3);
    else if (windowWidth >= 640) setGalleryImagePerPage(2);
    else setGalleryImagePerPage(2);
  }, [windowWidth]);

  useEffect(() => {
    setPages(Math.ceil(artworks.length / galleryImagePerPage) + 0.5);
  }, [galleryImagePerPage]);

  const onPointerDownAction = (e: PointerEvent<HTMLDivElement>) => {
    if (!selectedImage)
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
    if (!selectedImage) {
      if (!isDown) return;
      const x = e.pageX - sectionRef?.current!.offsetLeft;
      const walk = (x - startX) * 0.00001 * -5;
      setOffsetX((prev) => Math.max(0, Math.min(2, prev + walk)));
    }
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

  useVisibleScrollEffect(
    sectionRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        if (!selectedImage) {
          if (windowWidth >= 1024) {
            const yDelta = y + windowHeight - offsetBoundingRect.top;
            const ratio = Math.max(0, Math.min(yDelta / windowHeight, 1));
            setScrollPassRatio(ratio * 0.5);
          } else {
            setScrollPassRatio(-0.4);
          }
        }
      }),
    [windowHeight, selectedImage, setScrollPassRatio, windowWidth]
  );

  return (
    <section
      ref={sectionRef}
      className="h-[100vh] max-h-[1080px]"
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
            damping={0}
            pages={pages}
            distance={1}
            enabled={false}
          >
            <Scroll>
              <Pages
                pages={pages}
                offsetX={offsetX}
                isDown={isDown}
                scrollPassRatio={scrollPassRatio}
                setScrollPassRatio={setScrollPassRatio}
                artworks={_artworks}
                setDown={setDown}
              />
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </section>
  );
};
