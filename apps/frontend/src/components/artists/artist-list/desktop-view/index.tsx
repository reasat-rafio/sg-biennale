import { Dispatch, SetStateAction } from "react";
import { SortedArtistsList } from "..";
import { Anchor } from "./anchor";
import { ArtistArtwork } from "./artist-artwork";

interface DesktopViewProps {
  anchors: string[];
  activeAnchor: string;
  sortedArtistsList: SortedArtistsList[];
  setActiveAnchor: Dispatch<SetStateAction<string>>;
}

export const DesktopView: React.FC<DesktopViewProps> = ({
  anchors,
  activeAnchor,
  sortedArtistsList,
  setActiveAnchor,
}) => {
  return (
    <div className="flex space-x-10">
      <ArtistArtwork
        setActiveAnchor={setActiveAnchor}
        sortedArtistsList={sortedArtistsList}
      />
      <Anchor activeAnchor={activeAnchor} anchors={anchors} />
    </div>
  );
};
