import create from "zustand";
import { devtools } from "zustand/middleware";

interface IGlobalStore {
  navbarHeight: number;
  footerHeight: number;
  pageScrollY: number;
  showNavDropDown: boolean;
  disableSmoothScrolling: boolean;
  setDisableSmoothScrolling: (data: boolean) => void;
  setShowNavDropDown: (data: boolean) => void;
  setPageScrollY: (data: number) => void;
  addNavbarHeight: (data: number) => void;
  addFooterHeight: (data: number) => void;
}

const useGlobalStore = create(
  devtools<IGlobalStore>((set) => ({
    navbarHeight: 0,
    footerHeight: 0,
    pageScrollY: 0,
    showNavDropDown: false,
    disableSmoothScrolling: false,
    setShowNavDropDown: (showNavDropDown) =>
      set((state) => ({
        ...state,
        showNavDropDown,
      })),
    setDisableSmoothScrolling: (disableSmoothScrolling) =>
      set((state) => ({ ...state, disableSmoothScrolling })),
    setPageScrollY: (pageScrollY) =>
      set((state) => ({ ...state, pageScrollY })),
    addNavbarHeight: (navbarHeight) =>
      set((state) => ({ ...state, navbarHeight })),
    addFooterHeight: (footerHeight) =>
      set((state) => ({ ...state, footerHeight })),
  }))
);

export default useGlobalStore;