import { AnchorWrapper } from "@components/artists/anchor-wrapper";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { SortedArtistsList } from "..";
import { Artist } from "./artist";
import { Artworks } from "./artworks";

interface ArtistsProps {
  setActiveAnchor: Dispatch<SetStateAction<string>>;
  sortedArtistsList: SortedArtistsList[];
}

export const ArtistArtwork: React.FC<ArtistsProps> = ({
  sortedArtistsList,
  setActiveAnchor,
}) => {
  return (
    <div className="flex-1">
      <AnchorWrapper setActiveAnchor={setActiveAnchor}>
        {sortedArtistsList.map(({ data, title }) => (
          <section
            id={title}
            key={title}
            className="flex flex-col | lg:py-14 py-8"
          >
            <span className="mb-7 text-xl font-medium">{title}</span>
            <div className="grid grid-cols-12 | lg:gap-10 gap-5">
              {data.map(({ _id, name, slug, images, artworks }, index) => (
                <section className="grid grid-cols-12 col-span-12">
                  {index % 2 ? (
                    <>
                      <Artworks />
                      <Artist name={name} slug={slug} images={images} />
                    </>
                  ) : (
                    <>
                      <Artist name={name} slug={slug} images={images} />
                      <Artworks />
                    </>
                  )}
                </section>
              ))}
            </div>
          </section>
        ))}
      </AnchorWrapper>
    </div>
  );
};
