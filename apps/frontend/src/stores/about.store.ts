import {
  PastEditionCollection,
  SponsorCollection,
  TeamCollection,
} from "@lib/@types/about.types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface AboutStoreProps {
  pastEditions: PastEditionCollection[];
  abouts: SponsorCollection[];
  coArtisticDirectors: TeamCollection[];
  selectedPastEditionId: string | null;
  selectedAboutId: string | null;
  selectedCoArtisticDirectorId: string | null;
  setSelectedPastEditionId: (data: string | null) => void;
  setSelectedAboutId: (data: string | null) => void;
  setSelectedCoArtisticDirectorId: (data: string | null) => void;
  setPastEditions: (data: PastEditionCollection[]) => void;
  setAbouts: (data: SponsorCollection[]) => void;
  setCoArtisticDirectors: (data: TeamCollection[]) => void;
}

const useAboutStore = create(
  devtools<AboutStoreProps>((set) => ({
    pastEditions: [],
    abouts: [],
    coArtisticDirectors: [],
    selectedPastEditionId: null,
    selectedAboutId: null,
    selectedCoArtisticDirectorId: null,
    setSelectedPastEditionId: (selectedPastEditionId) =>
      set((state) => ({ ...state, selectedPastEditionId })),
    setSelectedAboutId: (selectedAboutId) =>
      set((state) => ({ ...state, selectedAboutId })),
    setSelectedCoArtisticDirectorId: (selectedCoArtisticDirectorId) =>
      set((state) => ({ ...state, selectedCoArtisticDirectorId })),
    setPastEditions: (pastEditions) =>
      set((state) => ({
        ...state,
        pastEditions,
      })),
    setAbouts: (abouts) =>
      set((state) => ({
        ...state,
        abouts,
      })),
    setCoArtisticDirectors: (coArtisticDirectors) =>
      set((state) => ({
        ...state,
        coArtisticDirectors,
      })),
  }))
);

export default useAboutStore;
