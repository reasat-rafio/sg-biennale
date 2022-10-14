import { AnchorWrapper } from "@components/artists/artist-list/anchor-wrapper";
import { Dispatch, SetStateAction } from "react";
import { Artist } from "../artist";
import { ArtistCard } from "../artist-collection";
import { motion } from "framer-motion";
import { SortedArtists } from "..";

interface ArtistArtworkProps {
  setActiveAnchor: Dispatch<SetStateAction<string>>;
  sortedArtistsList: SortedArtists[];
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
              {data.map(({ artist, artistCollection }, index) => (
                <motion.section
                  key={artist._id + index}
                  layout
                  className="grid grid-cols-12 col-span-12 gap-5 pb-20"
                >
                  <motion.div
                    layout
                    className="col-span-12 grid grid-cols-12 gap-5"
                  >
                    {artistCollection.map(
                      (artist, idx) =>
                        idx < 2 && (
                          <ArtistCard
                            key={artist._id}
                            screen="mobile"
                            {...artist}
                          />
                        )
                    )}
                  </motion.div>

                  <Artist
                    name={artist.name}
                    slug={artist.slug}
                    images={artist.images}
                    screen="mobile"
                  />

                  <motion.div
                    layout
                    className="col-span-12 grid grid-cols-12 gap-5 "
                  >
                    {artistCollection.map(
                      (artist, idx) =>
                        idx >= 2 && (
                          <ArtistCard
                            key={artist._id}
                            screen="mobile"
                            {...artist}
                          />
                        )
                    )}
                  </motion.div>
                </motion.section>
              ))}
            </div>
          </section>
        ))}
      </AnchorWrapper>
    </div>
  );
};
