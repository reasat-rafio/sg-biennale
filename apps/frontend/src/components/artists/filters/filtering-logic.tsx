import useArtistsStore from "@stores/artists.store";
import { ReactNode, useEffect } from "react";

interface FilteringLogicProps {
  children: ReactNode;
}

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  const { searchInput, allArtists, selectedRegionSorting, setFilteredArtists } =
    useArtistsStore();

  useEffect(() => {
    const filteredArtist = allArtists.filter((venue) => {
      if (searchInput?.length) {
        return venue.name.toLowerCase().includes(searchInput);
      } else {
        return venue.name;
      }
    });

    if (selectedRegionSorting !== null) {
      setFilteredArtists(
        filteredArtist.filter(
          ({ region }) => region?.value === selectedRegionSorting.value
        )
      );
    } else setFilteredArtists(filteredArtist);
  }, [allArtists, searchInput, selectedRegionSorting, setFilteredArtists]);

  return <>{children}</>;
};
