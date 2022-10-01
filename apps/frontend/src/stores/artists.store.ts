import { ArtistsProps } from "@lib/@types/artists.types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IArtistsStore {
  searchInput: string | null;
  allArtists: ArtistsProps[];
  filteredArtists: ArtistsProps[];
  selectedSorting: "alphabet" | null;
  setSearchInput: (data: string | null) => void;
  setAllArtists: (data: ArtistsProps[]) => void;
  setFilteredArtists: (data: ArtistsProps[]) => void;
  setSelectedSorting: (data: "alphabet" | null) => void;
}

const useArtistsStore = create(
  devtools<IArtistsStore>((set) => ({
    allArtists: [],
    filteredArtists: [],
    searchInput: null,
    selectedSorting: null,
    setAllArtists: (allArtists) => set((state) => ({ ...state, allArtists })),
    setFilteredArtists: (filteredArtists) =>
      set((state) => ({ ...state, filteredArtists })),
    setSearchInput: (searchInput) =>
      set((state) => ({ ...state, searchInput })),
    setSelectedSorting: (selectedSorting) =>
      set((state) => ({ ...state, selectedSorting })),
  }))
);

export default useArtistsStore;
