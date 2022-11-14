import useVisitorInfoStore from "@stores/visitor-info.store";
import { ReactNode, useEffect } from "react";

interface FilteringLogicProps {
  children: ReactNode;
}

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  const {
    page,
    cardsPerPage,
    searchInput,
    allVenues,
    selectedSorting,
    setSortedVenues,
  } = useVisitorInfoStore();

  useEffect(() => {
    const filteredVenues = allVenues.filter((venue) => {
      if (searchInput?.length) {
        return venue.name.toLowerCase().includes(searchInput);
      } else {
        return venue.name;
      }
    });

    if (selectedSorting === "alphabet") {
      filteredVenues.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    // else if (selectedSorting === "date") {
    //   filteredVenues.sort((a, b) =>
    //     (a as any).startAt > (b as any).startAt ? 1 : -1
    //   );
    // }

    // Show More Filtering
    setSortedVenues(filteredVenues.slice(0, cardsPerPage * page));
  }, [page, allVenues, searchInput, selectedSorting, setSortedVenues]);

  return <>{children}</>;
};
