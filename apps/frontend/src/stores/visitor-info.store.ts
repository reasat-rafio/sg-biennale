import create from "zustand";
import { devtools } from "zustand/middleware";

interface VisitorInfoStoreProps {
  page: number;
  cardsPerPage: number;
  searchInput: string | null;
  setPage: (data: number) => void;
  setSearchInput: (data: string | null) => void;
}

const useVisitorInfoStore = create(
  devtools<VisitorInfoStoreProps>((set) => ({
    page: 1,
    cardsPerPage: 6,
    searchInput: null,
    setPage: (page) => set((state) => ({ ...state, page })),
    setSearchInput: (searchInput: string | null) =>
      set((state) => ({ ...state, searchInput })),
  }))
);

export default useVisitorInfoStore;
