import create from "zustand";
import { devtools } from "zustand/middleware";

interface IArtistsStore {
  galleryIsScrollable: boolean;
  resetSelectedGalleryImage: boolean;
  setResetSelectedGalleryImage: (data: boolean) => void;
  setGalleryIsScrollable: (data: boolean) => void;
}

const useArtistsDetailsStore = create(
  devtools<IArtistsStore>((set) => ({
    galleryIsScrollable: true,
    resetSelectedGalleryImage: false,
    setResetSelectedGalleryImage: (resetSelectedGalleryImage) =>
      set((state) => ({ ...state, resetSelectedGalleryImage })),
    setGalleryIsScrollable: (galleryIsScrollable) =>
      set((state) => ({ ...state, galleryIsScrollable })),
  }))
);

export default useArtistsDetailsStore;
