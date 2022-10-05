import { ArtistsProps } from "@lib/@types/artists.types";
import create from "zustand";
import { devtools } from "zustand/middleware";
type SelectedRegion =
  | "singapore"
  | "rest-of-the-asia"
  | "rest-of-the-world"
  | null;

interface IArtistsStore {
  searchInput: string | null;
  allArtists: ArtistsProps[];
  filteredArtists: ArtistsProps[];
  selectedRegionSorting: SelectedRegion;
  setSearchInput: (data: string | null) => void;
  setAllArtists: (data: ArtistsProps[]) => void;
  setFilteredArtists: (data: ArtistsProps[]) => void;
  setSelectedRegionSorting: (data: SelectedRegion) => void;
}

const useArtistsStore = create(
  devtools<IArtistsStore>((set) => ({
    allArtists: [],
    filteredArtists: [],
    searchInput: null,
    selectedRegionSorting: null,
    setAllArtists: (allArtists) => set((state) => ({ ...state, allArtists })),
    setFilteredArtists: (filteredArtists) =>
      set((state) => ({ ...state, filteredArtists })),
    setSearchInput: (searchInput) =>
      set((state) => ({ ...state, searchInput })),
    setSelectedRegionSorting: (selectedSorting) =>
      set((state) => ({ ...state, selectedSorting })),
  }))
);

export default useArtistsStore;
