import { VenueProps } from "@lib/@types/visitor-info.types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface VisitorInfoStoreProps {
  page: number;
  cardsPerPage: number;
  searchInput: string | null;
  allVenues: VenueProps[];
  sortedVenues: VenueProps[];
  setPage: (data: number) => void;
  setSearchInput: (data: string | null) => void;
  setSortedVenues: (data: VenueProps[]) => void;
  setAllVenues: (data: VenueProps[]) => void;
}

const useVisitorInfoStore = create(
  devtools<VisitorInfoStoreProps>((set) => ({
    page: 1,
    allVenues: [],
    sortedVenues: [],
    cardsPerPage: 6,
    searchInput: null,
    setPage: (page) => set((state) => ({ ...state, page })),
    setAllVenues: (allVenues: VenueProps[]) =>
      set((state) => ({ ...state, allVenues })),
    setSortedVenues: (sortedVenues: VenueProps[]) =>
      set((state) => ({ ...state, sortedVenues })),
    setSearchInput: (searchInput: string | null) =>
      set((state) => ({ ...state, searchInput })),
  }))
);

export default useVisitorInfoStore;
