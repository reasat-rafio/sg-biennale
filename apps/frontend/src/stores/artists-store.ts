import { ArtistsProps } from "@lib/@types/artists.types";
import create from "zustand";
import { devtools } from "zustand/middleware";
import countries from "../../../../libs/countries";

interface ICountry {
  label: string;
  value: string;
}

interface IArtistsStore {
  allCountries: ICountry[];
  allArtists: ArtistsProps[];
  filteredArtists: ArtistsProps[];
  setAllArtists: (data: ArtistsProps[]) => void;
  setFilteredArtists: (data: ArtistsProps[]) => void;
}

const useArtistsStore = create(
  devtools<IArtistsStore>((set) => ({
    allCountries: countries,
    allArtists: [],
    filteredArtists: [],
    setAllArtists: (allArtists) => set((state) => ({ ...state, allArtists })),
    setFilteredArtists: (filteredArtists) =>
      set((state) => ({ ...state, filteredArtists })),
  }))
);

export default useArtistsStore;
