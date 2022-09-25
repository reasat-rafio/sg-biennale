import {
  AllCategoriesProps,
  AllVenuesProps,
  IPgrammeEvents,
} from "./../lib/@types/programmes-events-types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IProgrammesAndEvents {
  allCategories: AllCategoriesProps[];
  allVenues: AllVenuesProps[];
  allProgrammesAndEvents: IPgrammeEvents[];
  sortedProgrammesAndEvents: IPgrammeEvents[];
  setAllProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
  setSortedProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
  setAllCategories: (data: AllCategoriesProps[]) => void;
  setAllVenues: (data: AllVenuesProps[]) => void;
}

const useProgrammesAndEventsStore = create(
  devtools<IProgrammesAndEvents>((set) => ({
    allCategories: [],
    allVenues: [],
    allProgrammesAndEvents: [],
    sortedProgrammesAndEvents: [],
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
