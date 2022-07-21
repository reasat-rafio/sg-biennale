import create from "zustand";
import { devtools } from "zustand/middleware";
import countries from "country-list";
import { ArtistsProps } from "@components/artists/artists-list";

interface ICountry {
  name: string;
  code: string;
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
    allCountries: countries.getData(),
    allArtists: [],
    filteredArtists: [],
    setAllArtists: (allArtists) => set((state) => ({ ...state, allArtists })),
    setFilteredArtists: (filteredArtists) =>
      set((state) => ({ ...state, filteredArtists })),
  }))
);

export default useArtistsStore;
