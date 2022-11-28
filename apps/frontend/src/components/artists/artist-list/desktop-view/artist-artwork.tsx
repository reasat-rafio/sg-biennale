import { AnchorWrapper } from "@components/artists/artist-list/anchor-wrapper";
import { Dispatch, SetStateAction } from "react";
import { Artist } from "../artist";
import { ArtistCollection } from "../artist-collection";
import { motion } from "framer-motion";
import { DataProps, SortedArtists } from "..";

interface ArtistsProps {
  sortedArtistsList: SortedArtists[];
  setActiveAnchorIndex: Dispatch<SetStateAction<number>>;
  setActiveAnchor: Dispatch<SetStateAction<string>>;
}

export const ArtistArtwork: React.FC<ArtistsProps> = ({
  sortedArtistsList,
  setActiveAnchor,
  setActiveAnchorIndex,
}) => {
  return (
    <div className="flex-1">
      <AnchorWrapper
        setActiveAnchor={setActiveAnchor}
        setActiveAnchorIndex={setActiveAnchorIndex}
      >
        {sortedArtistsList.map(({ data, title }, rootIndex) => (
          <motion.section
            id={title}
            datatype-index={rootIndex}
            key={title + rootIndex}
            className="flex flex-col | lg:py-14 py-8"
          >
            <span className="mb-7 text-xl font-medium">{title}</span>
            <div className="grid grid-cols-12 | gap-10 ">
              {data.map((props, index) => (
                <section
                  key={props.artist._id + index}
                  className="grid grid-cols-12 col-span-12 gap-10"
                >
                  {rootIndex % 2 ? (
                    <>
                      {index % 2 ? (
                        <PositionRight {...props} />
                      ) : (
                        <PositionLeft {...props} />
                      )}
                    </>
                  ) : (
                    <>
                      {index % 2 ? (
                        <PositionLeft {...props} />
                      ) : (
                        <PositionRight {...props} />
                      )}
                    </>
                  )}
                </section>
              ))}
            </div>
          </motion.section>
        ))}
      </AnchorWrapper>
    </div>
  );
};

const PositionRight: React.FC<DataProps> = ({ artist, artistCollection }) => {
  return (
    <>
      <ArtistCollection artists={artistCollection} />
      <Artist name={artist.name} slug={artist.slug} images={artist.images} />
    </>
  );
};
const PositionLeft: React.FC<DataProps> = ({ artist, artistCollection }) => {
  return (
    <>
      <Artist name={artist.name} slug={artist.slug} images={artist.images} />
      <ArtistCollection artists={artistCollection} />
    </>
  );
};
