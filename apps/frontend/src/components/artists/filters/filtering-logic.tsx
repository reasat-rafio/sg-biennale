// import { filterLogicFactory } from "@lib/helpers/artists.helper";
// import useArtistsStore from "@stores/artists.store";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// interface FilteringLogicProps {
//   children: React.ReactNode;
// }

// export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
//   const router = useRouter();

//   const { allArtists, setFilteredArtists } = useArtistsStore();

//   useEffect(() => {
//     const newFilterdArtistsList = filterLogicFactory(allArtists, router);
//     setFilteredArtists(newFilterdArtistsList);
//   }, [router, allArtists, setFilteredArtists]);

//   return <div>{children}</div>;
// };

// import useArtistsStore from "@stores/visitor-info.store";
import useArtistsStore from "@stores/artists.store";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface FilteringLogicProps {
  children: ReactNode;
}

/* 🚩 gatekeeper of the intended queries */
const checkerForTheIntendedQuery = (filteringKeys: string[]) => {
  return filteringKeys.includes("search") || filteringKeys.includes("sort_by");
};

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  // const {
  //   page,
  //   cardsPerPage,
  //   searchInput,
  //   allVenues,
  //   setSearchInput,
  //   selectedSorting,
  //   setSortedVenues,
  // } = useArtistsStore();

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
    } else if (selectedSorting === "date") {
      filteredVenues.sort((a, b) => (a.startAt > b.startAt ? 1 : -1));
    }

    // Show More Filtering
    setSortedVenues(filteredVenues.slice(0, cardsPerPage * page));
  }, [page, allVenues, searchInput, selectedSorting, setSortedVenues]);

  return <>{children}</>;
};
