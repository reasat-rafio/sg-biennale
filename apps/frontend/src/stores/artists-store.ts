import { ArtistsProps, IFilterVenue } from "@lib/@types/artists.types";
import { Slug } from "@lib/@types/global.types";
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
  allVenues: IFilterVenue[];
  filteredArtists: ArtistsProps[];
  setAllArtists: (data: ArtistsProps[]) => void;
  setFilteredArtists: (data: ArtistsProps[]) => void;
  setAllVenues: (data: IFilterVenue[]) => void;
}

const useArtistsStore = create(
  devtools<IArtistsStore>((set) => ({
    allCountries: countries,
    allArtists: [],
    allVenues: [],
    filteredArtists: [],
    setAllArtists: (allArtists) => set((state) => ({ ...state, allArtists })),
    setFilteredArtists: (filteredArtists) =>
      set((state) => ({ ...state, filteredArtists })),
    setAllVenues: (allVenues) => set((state) => ({ ...state, allVenues })),
  }))
);

export default useArtistsStore;
