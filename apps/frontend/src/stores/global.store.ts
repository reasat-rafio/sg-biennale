import create from "zustand";
import { devtools } from "zustand/middleware";

interface IGlobalStore {
  navbarHeight: number;
  showNavDropDown: boolean;
  disableSmoothScrolling: boolean;
  setDisableSmoothScrolling: (data: boolean) => void;
  setShowNavDropDown: (data: boolean) => void;
  addNavbarHeight: (data: number) => void;
}

const useGlobalStore = create(
  devtools<IGlobalStore>((set) => ({
    navbarHeight: 0,
    showNavDropDown: false,
    disableSmoothScrolling: false,
    setShowNavDropDown: (showNavDropDown) =>
      set((state) => ({
        ...state,
        showNavDropDown,
      })),
    setDisableSmoothScrolling: (disableSmoothScrolling) =>
      set((state) => ({ ...state, disableSmoothScrolling })),
    addNavbarHeight: (navbarHeight) =>
      set((state) => ({ ...state, navbarHeight })),
  }))
);

export default useGlobalStore;
