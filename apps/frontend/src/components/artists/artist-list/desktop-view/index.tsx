import { Dispatch, SetStateAction } from "react";
import { SortedArtists } from "..";
import { Anchor } from "./anchor";
import { ArtistArtwork } from "./artist-artwork";

interface DesktopViewProps {
  anchors: string[];
  activeAnchor: string;
  activeAnchorIndex: number;
  sortedArtistsList: SortedArtists[];
  setActiveAnchor: Dispatch<SetStateAction<string>>;
  setActiveAnchorIndex: Dispatch<SetStateAction<number>>;
}

export const DesktopView: React.FC<DesktopViewProps> = ({
  anchors,
  activeAnchor,
  sortedArtistsList,
  setActiveAnchor,
  setActiveAnchorIndex,
  activeAnchorIndex,
}) => {
  return (
    <div className="flex space-x-10">
      <ArtistArtwork
        sortedArtistsList={sortedArtistsList}
        setActiveAnchor={setActiveAnchor}
        setActiveAnchorIndex={setActiveAnchorIndex}
      />
      <Anchor
        activeAnchorIndex={activeAnchorIndex}
        activeAnchor={activeAnchor}
        anchors={anchors}
      />
    </div>
  );
};
