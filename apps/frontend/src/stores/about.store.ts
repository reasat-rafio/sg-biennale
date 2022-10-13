import { PastEditionCollection, TeamCollection } from "@lib/@types/about.types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface AboutStoreProps {
  pastEditions: PastEditionCollection[];
  coArtisticDirectors: TeamCollection[];
  selectedPastEditionId: string | null;
  selectedCoArtisticDirectorId: string | null;
  setSelectedPastEditionId: (data: string | null) => void;
  setSelectedCoArtisticDirectorId: (data: string | null) => void;
  setPastEditions: (data: PastEditionCollection[]) => void;
  setCoArtisticDirectors: (data: TeamCollection[]) => void;
}

const useAboutStore = create(
  devtools<AboutStoreProps>((set) => ({
    pastEditions: [],
    coArtisticDirectors: [],
    selectedPastEditionId: null,
    selectedCoArtisticDirectorId: null,
    setSelectedPastEditionId: (selectedPastEditionId) =>
      set((state) => ({ ...state, selectedPastEditionId })),
    setSelectedCoArtisticDirectorId: (selectedCoArtisticDirectorId) =>
      set((state) => ({ ...state, selectedCoArtisticDirectorId })),
    setPastEditions: (pastEditions) =>
      set((state) => ({
        ...state,
        pastEditions,
      })),
    setCoArtisticDirectors: (coArtisticDirectors) =>
      set((state) => ({
        ...state,
        coArtisticDirectors,
      })),
  }))
);

export default useAboutStore;
