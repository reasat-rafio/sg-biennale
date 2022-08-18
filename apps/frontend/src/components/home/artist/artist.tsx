import { IArtistProps } from "@lib/@types/home.types";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useIntersection } from "@lib/hooks";
import { Images } from "./images";

interface ArtistProps {
  type: string;
  artists: IArtistProps[];
  title: string;
}

export const Artist: React.FC<ArtistProps> = ({ artists }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intersection = useIntersection(sectionRef, { threshold: 0.25 });
  const [clicked, setClikced] = useState<null | number>(null);

  // useEffect(() => {
  //   if (intersection?.isIntersecting) {
  //     canvasRef.current?.click();
  //   }
  // }, [intersection?.isIntersecting]);

  return (
    <section
      tabIndex={-1}
      ref={sectionRef}
      className="h-[100vh]"
      id="artist-image-carouel"
    >
      <Suspense fallback={null}>
        <Canvas
          ref={canvasRef}
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          onPointerMissed={() => setClikced(null)}
        >
          <Images clicked={clicked} setClikced={setClikced} artists={artists} />
        </Canvas>
      </Suspense>
    </section>
  );
};
