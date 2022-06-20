import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IGlobalStore {
  add: (data: string) => void;
}

const useGlobalStore = create(
  devtools<IGlobalStore>((set) => ({
    add: (data) => set((state) => ({})),
  }))
);

export default useGlobalStore;
