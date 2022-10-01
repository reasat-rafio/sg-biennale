import { AnchorWrapper } from "@components/artists/anchor-wrapper";
import { Dispatch, SetStateAction } from "react";
import { SortedArtistsList } from "..";
import { Artist } from "../artist";
import { ArtworkCard, Artworks } from "../artworks";

interface ArtistArtworkProps {
  setActiveAnchor: Dispatch<SetStateAction<string>>;
  sortedArtistsList: SortedArtistsList[];
}

export const ArtistArtwork: React.FC<ArtistArtworkProps> = ({
  setActiveAnchor,
  sortedArtistsList,
}) => {
  return (
    <div>
      <AnchorWrapper setActiveAnchor={setActiveAnchor}>
        {sortedArtistsList.map(({ data, title }) => (
          <section
            id={title}
            key={title}
            className="flex flex-col | lg:py-14 py-8"
          >
            <span className="mb-7 text-xl font-medium">{title}</span>
            <div className="grid grid-cols-12 | gap-5">
              {data.map(({ name, slug, images, artworks }) => (
                <section className="grid grid-cols-12 col-span-12 gap-5  pb-20">
                  <div className="col-span-12 grid grid-cols-12 gap-5">
                    {artworks.map(
                      (art, idx) => idx < 2 && <ArtworkCard {...art} />
                    )}
                  </div>

                  <Artist name={name} slug={slug} images={images} />

                  <div className="col-span-12 grid grid-cols-12 gap-5 ">
                    {artworks.map(
                      (art, idx) => idx >= 2 && <ArtworkCard {...art} />
                    )}
                  </div>
                </section>
              ))}
            </div>
          </section>
        ))}
      </AnchorWrapper>
    </div>
  );
};
