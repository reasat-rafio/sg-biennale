import { IArtistProps } from "@lib/@types/home.types";
import React, {
  PointerEvent,
  Suspense,
  TouchEvent,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import {
  animationFrameEffect,
  useVisibleScrollEffect,
  useWindowSize,
} from "@lib/hooks";
import { Images } from "./images";
import { useRouter } from "next/router";

interface ArtistProps {
  type: string;
  artists: IArtistProps[];
  title: string;
}

export const Artist: React.FC<ArtistProps> = ({ artists }) => {
  const router = useRouter();
  let myTimeout: NodeJS.Timeout | null = null;
  const windowHeight = useWindowSize()?.height ?? 0;
  const windowWidth = useWindowSize()?.width ?? 0;
  const sectionRef = useRef<HTMLElement>(null);
  const [clicked, setClikced] = useState<null | number>(null);
  const [scrollPassRatio, setScrollPassRatio] = useState(0);
  const [isDown, setDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const onPointerDownAction = (e: PointerEvent<HTMLDivElement>) => {
    myTimeout = setTimeout(() => {
      setDown(true);
      if (sectionRef?.current) sectionRef.current!.style.cursor = "grabbing";
      setStartX(e.pageX - sectionRef?.current!.offsetLeft);
    }, 200);
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
    if (!isDown) return;
    const x = e.pageX - sectionRef?.current!.offsetLeft;
    const walk = (x - startX) * 0.00001 * -5;
    setOffsetX((prev) => Math.max(0, Math.min(2, prev + walk)));
  };
  const onTouchStartAction = (e: TouchEvent) => {
    setDown(true);
    setStartX(e.touches[0].pageX - sectionRef?.current!.offsetLeft);
  };
  const onTouchEndAction = () => setDown(false);
  const onTouchMoveAction = (e: TouchEvent) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - sectionRef?.current!.offsetLeft;
    const walk = (x - startX) * 0.001 * -5;
    setOffsetX((prev) => Math.max(0, Math.min(2, prev + walk)));
  };

  useVisibleScrollEffect(
    sectionRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        if (windowWidth >= 1024) {
          const yDelta = y + windowHeight - offsetBoundingRect.top;
          const ratio = Math.max(0, Math.min(yDelta / windowHeight));
          setScrollPassRatio(ratio);
        } else {
          setScrollPassRatio(-0.3);
        }
      }),
    [windowHeight]
  );

  return (
    <section ref={sectionRef} className="h-[100vh]" id="artist-image-carouel">
      <Suspense fallback={null}>
        <Canvas
          style={{ overflow: "hidden" }}
          onTouchStart={onTouchStartAction}
          onTouchEnd={onTouchEndAction}
          onTouchMove={onTouchMoveAction}
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
            isDown={isDown}
            artists={artists}
            clicked={clicked}
            router={router}
            myTimeout={myTimeout}
            setClikced={setClikced}
            scrollPassRatio={scrollPassRatio}
          />
        </Canvas>
      </Suspense>
    </section>
  );
};
