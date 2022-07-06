import {
  AllCategoriesProps,
  AllVenuesProps,
  IPgrammeEvents,
} from "./../lib/@types/programmes-events-types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IFilters {
  venue: string;
  category: string;
  date: string;
}

interface IProgrammesAndEvents {
  initialVisibleItems: number;
  numOfItemsWillIncrease: number;
  allCategories: AllCategoriesProps[];
  allVenues: AllVenuesProps[];
  allProgrammesAndEvents: IPgrammeEvents[];
  onScreenProgrammesAndEvents: IPgrammeEvents[];
  setAllProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
  setOnScreenProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
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
    onScreenProgrammesAndEvents: [],
    setAllProgrammesAndEvents: (allProgrammesAndEvents) =>
      set((state) => ({ ...state, allProgrammesAndEvents })),
    setOnScreenProgrammesAndEvents: (onScreenProgrammesAndEvents) =>
      set((state) => ({ ...state, onScreenProgrammesAndEvents })),
    setAllCategories: (allCategories) =>
      set((state) => ({
        ...state,
        allCategories,
      })),
    setAllVenues: (allVenues) => set((state) => ({ ...state, allVenues })),
  }))
);

export default useProgrammesAndEventsStore;
