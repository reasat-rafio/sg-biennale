import { PastEditionCollection } from "@lib/@types/about.types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface AboutStoreProps {
  pastEditions: PastEditionCollection[];
  selectedPastEditionId: string | null;
  setSelectedPastEditionId: (data: string | null) => void;
  setPastEditions: (data: PastEditionCollection[]) => void;
}

const useAboutStore = create(
  devtools<AboutStoreProps>((set) => ({
    pastEditions: [],
    selectedPastEditionId: null,
    setSelectedPastEditionId: (selectedPastEditionId) =>
      set((state) => ({ ...state, selectedPastEditionId })),
    setPastEditions: (pastEditions) =>
      set((state) => ({
        ...state,
        pastEditions,
      })),
  }))
);

export default useAboutStore;
