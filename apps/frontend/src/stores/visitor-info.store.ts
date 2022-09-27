import { VenueProps } from "@lib/@types/visitor-info.types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface VisitorInfoStoreProps {
  page: number;
  cardsPerPage: number;
  searchInput: string | null;
  allVenues: VenueProps[];
  sortedVenues: VenueProps[];
  selectedSorting: "alphabet" | "date" | null;
  setPage: (data: number) => void;
  setSearchInput: (data: string | null) => void;
  setSortedVenues: (data: VenueProps[]) => void;
  setAllVenues: (data: VenueProps[]) => void;
  setSelectedSorting: (data: "alphabet" | "date" | null) => void;
}

const useVisitorInfoStore = create(
  devtools<VisitorInfoStoreProps>((set) => ({
    page: 1,
    allVenues: [],
    sortedVenues: [],
    selectedSorting: null,
    cardsPerPage: 6,
    searchInput: null,
    setPage: (page) => set((state) => ({ ...state, page })),
    setAllVenues: (allVenues) => set((state) => ({ ...state, allVenues })),
    setSortedVenues: (sortedVenues) =>
      set((state) => ({ ...state, sortedVenues })),
    setSearchInput: (searchInput) =>
      set((state) => ({ ...state, searchInput })),
    setSelectedSorting: (selectedSorting) =>
      set((state) => ({ ...state, selectedSorting })),
  }))
);

export default useVisitorInfoStore;
