import { IArtistProps } from "@lib/@types/home.types";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { state } from "./util";
import { useIntersection } from "@lib/hooks";
import { Images } from "./images";

interface ArtistProps {
  type: string;
  artists: IArtistProps[];
  title: string;
}

export const Artist: React.FC<ArtistProps> = ({ artists }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const intersection = useIntersection(sectionRef, { threshold: 0.25 });

  return (
    <section tabIndex={-1} ref={sectionRef} className="h-[100vh] ">
      <Suspense fallback={null}>
        <Canvas
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          onPointerMissed={() => (state.clicked = null)}
        >
          <Images artists={artists} />
        </Canvas>
      </Suspense>
    </section>
  );
};
