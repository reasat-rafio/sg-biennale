import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IGlobalStore {
  navbarHeight: number;
  footerHeight: number;
  addNavbarHeight: (data: number) => void;
  addFooterHeight: (data: number) => void;
}

const useGlobalStore = create(
  devtools<IGlobalStore>((set) => ({
    navbarHeight: 0,
    footerHeight: 0,
    addNavbarHeight: (navbarHeight) =>
      set((state) => ({ ...state, navbarHeight })),
    addFooterHeight: (footerHeight) =>
      set((state) => ({ ...state, footerHeight })),
  }))
);

export default useGlobalStore;
