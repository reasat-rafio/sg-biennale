import React, { Dispatch, RefObject, SetStateAction } from "react";
import { useThree } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Minimap } from "./minmap";
import { IArtistProps } from "@lib/@types/home.types";
import { Image_ } from "./image";
import { NextRouter } from "next/router";

interface ImagesProps {
  artists: IArtistProps[];
  clicked: null | number;
  scrollPassRatio: number;
  offsetX: number;
  cursorGrab: boolean;
  router: NextRouter;
  setClikced: Dispatch<SetStateAction<null | number>>;
}
const w = 4;
const gap = 0.15;
export const Images: React.FC<ImagesProps> = ({
  artists,
  clicked,
  offsetX,
  router,
  scrollPassRatio,
  setClikced,
}) => {
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;

  return (
    <ScrollControls
      style={{ overflow: "hidden" }}
      horizontal
      enabled={false}
      damping={10}
      pages={(width - xW + artists.length * xW) / width}
    >
      <Minimap length={artists.length} />
      <Scroll>
        {artists.map(({ artworks, name, countries, slug }, i) => (
          <Image_
            key={i}
            index={i}
            position={[i * xW, 0, 0]}
            scale={[w, 4, 1]}
            length={artists.length}
            scrollPassRatio={scrollPassRatio}
            slug={slug}
            clicked={clicked}
            name={name}
            offsetX={offsetX}
            countries={countries}
            router={router}
            setClikced={setClikced}
            url={artworks[0].images[0].asset.url}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
};
