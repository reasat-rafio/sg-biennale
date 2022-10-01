import { ArtistsProps } from "@lib/@types/artists.types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IArtistsStore {
  page: number;
  searchInput: string | null;
  allArtists: ArtistsProps[];
  filteredArtists: ArtistsProps[];
  setSearchInput: (data: string | null) => void;
  setAllArtists: (data: ArtistsProps[]) => void;
  setFilteredArtists: (data: ArtistsProps[]) => void;
}

const useArtistsStore = create(
  devtools<IArtistsStore>((set) => ({
    page: 1,
    allArtists: [],
    filteredArtists: [],
    searchInput: null,
    setAllArtists: (allArtists) => set((state) => ({ ...state, allArtists })),
    setFilteredArtists: (filteredArtists) =>
      set((state) => ({ ...state, filteredArtists })),
    setSearchInput: (searchInput) =>
      set((state) => ({ ...state, searchInput })),
  }))
);

export default useArtistsStore;
