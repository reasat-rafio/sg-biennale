import useArtistsStore from "@stores/artists.store";
import { ReactNode, useEffect } from "react";

interface FilteringLogicProps {
  children: ReactNode;
}

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  const { searchInput, allArtists, selectedSorting, setFilteredArtists } =
    useArtistsStore();

  useEffect(() => {
    const filteredVenues = allArtists.filter((venue) => {
      if (searchInput?.length) {
        return venue.name.toLowerCase().includes(searchInput);
      } else {
        return venue.name;
      }
    });

    if (selectedSorting === "alphabet") {
      filteredVenues.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    setFilteredArtists(filteredVenues);
  }, [allArtists, searchInput, selectedSorting, setFilteredArtists]);

  return <>{children}</>;
};
