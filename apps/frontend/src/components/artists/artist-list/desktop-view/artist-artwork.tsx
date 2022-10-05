import { AnchorWrapper } from "@components/artists/artist-list/anchor-wrapper";
import { Dispatch, SetStateAction } from "react";
import { Artist } from "../artist";
import { ArtistCollection } from "../artist-collection";
import { motion } from "framer-motion";
import { SortedArtists } from "..";

interface ArtistsProps {
  setActiveAnchor: Dispatch<SetStateAction<string>>;
  sortedArtistsList: SortedArtists[];
}

export const ArtistArtwork: React.FC<ArtistsProps> = ({
  sortedArtistsList,
  setActiveAnchor,
}) => {
  return (
    <div className="flex-1">
      <AnchorWrapper setActiveAnchor={setActiveAnchor}>
        {sortedArtistsList.map(({ data, title }, rootIndex) => (
          <section
            id={title}
            key={title}
            className="flex flex-col | lg:py-14 py-8"
          >
            <span className="mb-7 text-xl font-medium">{title}</span>
            <div className="grid grid-cols-12 | gap-10 ">
              {data.map(({ artist, artistCollection }, index) => (
                <motion.section
                  layout
                  className="grid grid-cols-12 col-span-12 gap-10"
                >
                  {rootIndex % 2 ? (
                    <>
                      {index % 2 ? (
                        <>
                          <ArtistCollection artists={artistCollection} />
                          <Artist
                            name={artist.name}
                            slug={artist.slug}
                            images={artist.images}
                          />
                        </>
                      ) : (
                        <>
                          <Artist
                            name={artist.name}
                            slug={artist.slug}
                            images={artist.images}
                          />
                          <ArtistCollection artists={artistCollection} />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {index % 2 ? (
                        <>
                          <Artist
                            name={artist.name}
                            slug={artist.slug}
                            images={artist.images}
                          />
                          <ArtistCollection artists={artistCollection} />
                        </>
                      ) : (
                        <>
                          <ArtistCollection artists={artistCollection} />
                          <Artist
                            name={artist.name}
                            slug={artist.slug}
                            images={artist.images}
                          />
                        </>
                      )}
                    </>
                  )}
                </motion.section>
              ))}
            </div>
          </section>
        ))}
      </AnchorWrapper>
    </div>
  );
};
