import { Container } from "@components/ui/container";
import { ArtistsProps } from "@lib/@types/artists.types";
import { useWindowSize } from "@lib/hooks";
import useArtistsStore from "@stores/artists.store";
import { useEffect, useState } from "react";
import { DesktopView } from "./desktop-view";
import { MobileView } from "./mobile-view";

export interface DataProps {
  artist: ArtistsProps;
  artistCollection: ArtistsProps[];
}

export interface SortedArtists {
  title: string;
  data: DataProps[];
}

export function sliceIntoChunks<T>(arr: T[], chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    const newArr = {
      artist: chunk[0],
      artistCollection: chunk.filter((_, idx) => idx !== 0),
    };

    res.push(newArr);
  }
  return res;
}

export const ArtistsList: React.FC<{}> = ({}) => {
  const { filteredArtists } = useArtistsStore();
  const windowWidth = useWindowSize()?.width ?? 0;
  const [activeAnchor, setActiveAnchor] = useState("");
  const [anchors, setAnchors] = useState<string[]>([]);

  const [sortedArtistsList, setSortedArtistList] = useState<SortedArtists[]>(
    []
  );

  useEffect(() => {
    const newSortedArtistListWithTitleAsFirstLatter: SortedArtists[] =
      Object.values(
        filteredArtists.reduce((newVal: any, artist) => {
          let firstLetter = artist.name[0].toLocaleUpperCase();

          !newVal[firstLetter]
            ? (newVal[firstLetter] = { title: firstLetter, data: [artist] })
            : newVal[firstLetter].data.push(artist);

          return newVal;
        }, {})
      );

    const alphabeticalSorting = newSortedArtistListWithTitleAsFirstLatter.sort(
      (a, b) => (a.title > b.title ? 1 : -1)
    );

    const chunking = alphabeticalSorting.map((artist) => ({
      ...artist,
      data: sliceIntoChunks(artist.data, 5),
    }));

    setSortedArtistList(chunking as any);
  }, [filteredArtists]);

  useEffect(() => {
    setAnchors(sortedArtistsList.map(({ title }) => title));
  }, [sortedArtistsList]);

  const props = {
    activeAnchor,
    anchors,
    sortedArtistsList,
    setActiveAnchor,
  };

  return (
    <Container className="bg-[#F8F8F8] mt-x lg:py-x py-md">
      {windowWidth >= 1024 ? (
        <DesktopView {...props} />
      ) : (
        <MobileView {...props} />
      )}
    </Container>
  );
};
