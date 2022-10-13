import {
  AllCategoriesProps,
  AllVenuesProps,
  IPgrammeEvents,
} from "../lib/@types/programmes-events.types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IProgrammesAndEvents {
  page: number;
  cardsPerPage: number;
  selectedCatagory: string | null;
  selectedSorting: string | null;
  selectedVenue: string | null;
  allCategories: AllCategoriesProps[];
  allVenues: AllVenuesProps[];
  allProgrammesAndEvents: IPgrammeEvents[];
  sortedProgrammesAndEvents: IPgrammeEvents[];
  setPage: (data: number) => void;
  setAllProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
  setSortedProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
  setAllCategories: (data: AllCategoriesProps[]) => void;
  setAllVenues: (data: AllVenuesProps[]) => void;
  setSelectedVenue: (data: string | null) => void;
  setSelectedSorting: (data: "alphabet" | "date" | null) => void;
  setSelectedCatagory: (data: string | null) => void;
}

const useProgrammesAndEventsStore = create(
  devtools<IProgrammesAndEvents>((set) => ({
    page: 1,
    cardsPerPage: 6,
    selectedCatagory: null,
    selectedSorting: null,
    selectedVenue: null,
    allCategories: [],
    allVenues: [],
    allProgrammesAndEvents: [],
    sortedProgrammesAndEvents: [],
    setPage: (page) => set((state) => ({ ...state, page })),
    setAllProgrammesAndEvents: (allProgrammesAndEvents) =>
      set((state) => ({ ...state, allProgrammesAndEvents })),
    setSortedProgrammesAndEvents: (sortedProgrammesAndEvents) =>
      set((state) => ({ ...state, sortedProgrammesAndEvents })),
    setAllCategories: (allCategories) =>
      set((state) => ({
        ...state,
        allCategories,
      })),
    setAllVenues: (allVenues) => set((state) => ({ ...state, allVenues })),
    setSelectedVenue: (selectedVenue) =>
      set((state) => ({ ...state, selectedVenue })),
    setSelectedCatagory: (selectedCatagory) =>
      set((state) => ({ ...state, selectedCatagory })),
    setSelectedSorting: (selectedSorting) =>
      set((state) => ({ ...state, selectedSorting })),
  }))
);

export default useProgrammesAndEventsStore;
