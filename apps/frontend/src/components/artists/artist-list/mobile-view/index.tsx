import { Dispatch, SetStateAction } from "react";
import { SortedArtists } from "..";
import { Anchor } from "./anchor";
import { ArtistArtwork } from "./artist-artwork";

interface MobileViewProps {
  anchors: string[];
  activeAnchor: string;
  activeAnchorIndex: number;
  sortedArtistsList: SortedArtists[];
  setActiveAnchor: Dispatch<SetStateAction<string>>;
  setActiveAnchorIndex: Dispatch<SetStateAction<number>>;
}

export const MobileView: React.FC<MobileViewProps> = ({
  anchors,
  activeAnchor,
  sortedArtistsList,
  setActiveAnchor,
  activeAnchorIndex,
  setActiveAnchorIndex,
}) => {
  return (
    <div className="">
      <Anchor
        anchors={anchors}
        activeAnchor={activeAnchor}
        activeAnchorIndex={activeAnchorIndex}
      />
      <ArtistArtwork
        setActiveAnchorIndex={setActiveAnchorIndex}
        setActiveAnchor={setActiveAnchor}
        sortedArtistsList={sortedArtistsList}
      />
    </div>
  );
};
