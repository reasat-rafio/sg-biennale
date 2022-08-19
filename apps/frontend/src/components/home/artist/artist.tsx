import { IArtistProps } from "@lib/@types/home.types";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { Images } from "./images";

interface ArtistProps {
  type: string;
  artists: IArtistProps[];
  title: string;
}

export const Artist: React.FC<ArtistProps> = ({ artists }) => {
  const windowHeight = useWindowSize()?.height ?? 0;
  const sectionRef = useRef<HTMLElement>(null);
  const [clicked, setClikced] = useState<null | number>(null);
  const [scrollPassRatio, setScrollPassRatio] = useState(0);
  const [isDown, setDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  useVisibleScrollEffect(
    sectionRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top;
        const ratio = Math.max(0, Math.min(yDelta / windowHeight));
        setScrollPassRatio(ratio);
      }),
    [windowHeight]
  );

  const onPointerDownAction = (e: any) => {
    setDown(true);
    setStartX(e.pageX - sectionRef?.current!.offsetLeft);
  };
  const onPointerLeaveAction = () => setDown(false);
  const onPointerUpAction = () => setDown(false);
  const onPointerMoveAction = (e: any) => {
    if (!isDown) return;
    const x = e.pageX - sectionRef?.current!.offsetLeft;
    const walk = (x - startX) * 0.001 * -1;

    setOffsetX((prev) => Math.max(0, Math.min(2, prev + walk)));
  };

  return (
    <section ref={sectionRef} className="h-[100vh]" id="artist-image-carouel">
      <Suspense fallback={null}>
        <Canvas
          onPointerDown={onPointerDownAction}
          onPointerLeave={onPointerLeaveAction}
          onPointerUp={onPointerUpAction}
          onPointerMove={onPointerMoveAction}
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          onPointerMissed={() => setClikced(null)}
        >
          <Images
            offsetX={offsetX}
            artists={artists}
            clicked={clicked}
            setClikced={setClikced}
            scrollPassRatio={scrollPassRatio}
          />
        </Canvas>
      </Suspense>
    </section>
  );
};
