import { ArtistsProps, Tag } from "@lib/@types/artists.types";
import create from "zustand";
import { devtools } from "zustand/middleware";
import regions from "../../../../libs/regions";

interface IArtistsStore {
  searchInput: string | null;
  allArtists: ArtistsProps[];
  allRegions: Tag[];
  filteredArtists: ArtistsProps[];
  selectedRegionSorting: Tag | null;
  setSearchInput: (data: string | null) => void;
  setAllArtists: (data: ArtistsProps[]) => void;
  setFilteredArtists: (data: ArtistsProps[]) => void;
  setSelectedRegionSorting: (data: Tag | null) => void;
}

const useArtistsStore = create(
  devtools<IArtistsStore>((set) => ({
    allArtists: [],
    filteredArtists: [],
    allRegions: regions,
    searchInput: null,
    selectedRegionSorting: null,
    setAllArtists: (allArtists) => set((state) => ({ ...state, allArtists })),
    setFilteredArtists: (filteredArtists) =>
      set((state) => ({ ...state, filteredArtists })),
    setSearchInput: (searchInput) =>
      set((state) => ({ ...state, searchInput })),
    setSelectedRegionSorting: (selectedRegionSorting) =>
      set((state) => ({ ...state, selectedRegionSorting })),
  }))
);

export default useArtistsStore;
