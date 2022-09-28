import { Container } from "@components/ui/container";
import { ArtistsProps } from "@lib/@types/artists.types";
import useArtistsStore from "@stores/artists.store";
import { useEffect, useState } from "react";
import { Anchor } from "./anchor";
import { Artists } from "./artists";

export interface SortedArtistsList {
  title: string;
  data: ArtistsProps[];
}

export const ArtistsList: React.FC<{}> = ({}) => {
  const { filteredArtists } = useArtistsStore();
  const [activeAnchor, setActiveAnchor] = useState("");
  const [anchors, setAnchors] = useState<string[]>([]);

  const [sortedArtistsList, setSortedArtistList] = useState<
    SortedArtistsList[]
  >([]);

  useEffect(() => {
    const newSortedArtistListWithTitleAsFirstLatter: SortedArtistsList[] =
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

    setSortedArtistList(alphabeticalSorting);
  }, [filteredArtists]);

  useEffect(() => {
    setAnchors(sortedArtistsList.map(({ title }) => title));
  }, [sortedArtistsList]);

  return (
    <Container className="bg-[#F8F8F8] mt-x py-x">
      <div className="flex space-x-20">
        <Artists
          setActiveAnchor={setActiveAnchor}
          sortedArtistsList={sortedArtistsList}
        />
        <Anchor activeAnchor={activeAnchor} anchors={anchors} />
      </div>
    </Container>
  );
};
