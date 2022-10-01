import { Dispatch, SetStateAction } from "react";
import { SortedArtistsList } from "..";
import { Anchor } from "./anchor";
import { ArtistArtwork } from "./artist-artwork";

interface MobileViewProps {
  anchors: string[];
  activeAnchor: string;
  sortedArtistsList: SortedArtistsList[];
  setActiveAnchor: Dispatch<SetStateAction<string>>;
}

export const MobileView: React.FC<MobileViewProps> = ({
  anchors,
  activeAnchor,
  sortedArtistsList,
  setActiveAnchor,
}) => {
  return (
    <div className="">
      <Anchor activeAnchor={activeAnchor} anchors={anchors} />
      <ArtistArtwork
        setActiveAnchor={setActiveAnchor}
        sortedArtistsList={sortedArtistsList}
      />
    </div>
  );
};
