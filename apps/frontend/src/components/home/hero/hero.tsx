import React, { useRef, useState } from "react";
import { HomHeroProps } from "@lib/@types/home.types";
import { PortableText } from "@utils/sanity";
import { Container } from "@components/ui/container";
import dynamic from "next/dynamic";
import { Vector2 } from "@react-three/fiber";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
});

export const Hero: React.FC<HomHeroProps> = ({ image, description }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [coords, setCoords] = useState<Vector2>([0, 0]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setCoords([
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    ]);
  };

  return (
    <section
      ref={sectionRef}
      className="h-screen"
      onMouseMove={handleMouseMove}
    >
      <HeroScene coords={coords} image={image} />
      <Container>
        <PortableText blocks={description} />
      </Container>
    </section>
  );
};
