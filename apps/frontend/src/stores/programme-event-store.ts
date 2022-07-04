import {
  AllCategoriesProps,
  AllVenuesProps,
  IPgrammeEvents,
} from "./../lib/@types/programmes-events-types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IProgrammesAndEvents {
  initialVisibleItems: number;
  numOfItemsWillIncrease: number;
  allCategories: AllCategoriesProps[];
  allVenues: AllVenuesProps[];
  allProgrammesAndEvents: IPgrammeEvents[];
  visualProgrammesAndEvents: IPgrammeEvents[];
  setAllProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
  setVisualProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
  setAllCategories: (data: AllCategoriesProps[]) => void;
  setAllVenues: (data: AllVenuesProps[]) => void;
}

const useProgrammesAndEventsStore = create(
  devtools<IProgrammesAndEvents>((set) => ({
    initialVisibleItems: 8,
    numOfItemsWillIncrease: 4,
    allCategories: [],
    allVenues: [],
    allProgrammesAndEvents: [],
    visualProgrammesAndEvents: [],
    setAllProgrammesAndEvents: (allProgrammesAndEvents) =>
      set((state) => ({ ...state, allProgrammesAndEvents })),
    setVisualProgrammesAndEvents: (visualProgrammesAndEvents) =>
      set((state) => ({ ...state, visualProgrammesAndEvents })),
    setAllCategories: (allCategories) =>
      set((state) => ({
        ...state,
        allCategories,
      })),
    setAllVenues: (allVenues) => set((state) => ({ ...state, allVenues })),
  }))
);

export default useProgrammesAndEventsStore;
