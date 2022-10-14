import React, { Dispatch, SetStateAction } from "react";
import { useThree } from "@react-three/fiber";
import { Minimap } from "./minmap";
import { IArtistProps } from "@lib/@types/home.types";
import { Image } from "./image";
import { NextRouter } from "next/router";
import { Scroll, ScrollControls } from "@lib/helpers/scroll-controls.helper";
import { imageUrlBuilder } from "@utils/sanity";

interface ImagesProps {
  artists: IArtistProps[];
  clicked: null | number;
  scrollPassRatio: number;
  offsetX: number;
  isDown: boolean;
  router: NextRouter;
  myTimeout: NodeJS.Timeout | null;
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
  myTimeout,
  isDown,
  setClikced,
}) => {
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;

  return (
    <ScrollControls
      horizontal
      damping={1}
      distance={1}
      enabled={false}
      pages={(width - xW + artists.length * xW) / width}
    >
      <Minimap length={artists.length} />
      <Scroll>
        {artists.map(({ artworks, name, countries, slug, _id }, i) => {
          const compressedImageUrl = imageUrlBuilder
            .image(artworks[0].images[0])
            .width(600)
            .format("jpg")
            .auto("format")
            .quality(80)
            .url();

          return (
            <Image
              key={_id}
              index={i}
              position={[i * xW, 0, 0]}
              scale={[w, 4.5, 1]}
              length={artists.length}
              scrollPassRatio={scrollPassRatio}
              slug={slug}
              clicked={clicked}
              name={name}
              isDown={isDown}
              offsetX={offsetX}
              myTimeout={myTimeout}
              countries={countries}
              router={router}
              setClikced={setClikced}
              url={compressedImageUrl as string}
            />
          );
        })}
      </Scroll>
    </ScrollControls>
  );
};
