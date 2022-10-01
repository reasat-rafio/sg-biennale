import { Dispatch, SetStateAction } from "react";
import { SortedArtistsList } from "..";
import { Anchor } from "../anchor";
import { ArtistArtwork } from "./artist-artwork";

interface indexProps {
  anchors: string[];
  activeAnchor: string;
  sortedArtistsList: SortedArtistsList[];
  setActiveAnchor: Dispatch<SetStateAction<string>>;
}

export const DesktopView: React.FC<indexProps> = ({
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
