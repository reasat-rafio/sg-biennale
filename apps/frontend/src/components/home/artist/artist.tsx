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
  // console.log(.classList.add("hererereerere"));

  useVisibleScrollEffect(
    sectionRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top;
        const ratio = Math.max(0, Math.min(yDelta / windowHeight));

        // sectionRef.current!.children[0]!.scrollLeft += ratio * 10;
        setScrollPassRatio(ratio);
      }),
    [windowHeight]
  );

  return (
    <section ref={sectionRef} className="h-[100vh]" id="artist-image-carouel">
      <Suspense fallback={null}>
        <Canvas
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          onPointerMissed={() => setClikced(null)}
        >
          <Images
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
