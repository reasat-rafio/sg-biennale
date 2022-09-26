import {
  AllCategoriesProps,
  AllVenuesProps,
  IPgrammeEvents,
} from "../lib/@types/programmes-events-types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IProgrammesAndEvents {
  page: number;
  cardsPerPage: number;
  allCategories: AllCategoriesProps[];
  allVenues: AllVenuesProps[];
  allProgrammesAndEvents: IPgrammeEvents[];
  sortedProgrammesAndEvents: IPgrammeEvents[];
  setPage: (data: number) => void;
  setAllProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
  setSortedProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
  setAllCategories: (data: AllCategoriesProps[]) => void;
  setAllVenues: (data: AllVenuesProps[]) => void;
}

const useProgrammesAndEventsStore = create(
  devtools<IProgrammesAndEvents>((set) => ({
    page: 1,
    cardsPerPage: 6,
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
  }))
);

export default useProgrammesAndEventsStore;
