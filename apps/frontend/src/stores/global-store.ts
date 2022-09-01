import create from "zustand";
import { devtools } from "zustand/middleware";

interface IGlobalStore {
  navbarHeight: number;
  footerHeight: number;
  showNavDropDown: boolean;
  setShowNavDropDown: (data: boolean) => void;
  addNavbarHeight: (data: number) => void;
  addFooterHeight: (data: number) => void;
}

const useGlobalStore = create(
  devtools<IGlobalStore>((set) => ({
    navbarHeight: 0,
    footerHeight: 0,
    showNavDropDown: false,
    setShowNavDropDown: (showNavDropDown) =>
      set((state) => ({
        ...state,
        showNavDropDown,
      })),
    addNavbarHeight: (navbarHeight) =>
      set((state) => ({ ...state, navbarHeight })),
    addFooterHeight: (footerHeight) =>
      set((state) => ({ ...state, footerHeight })),
  }))
);

export default useGlobalStore;
