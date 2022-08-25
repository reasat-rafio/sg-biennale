import create from "zustand";
import { devtools } from "zustand/middleware";

interface IArtistsStore {
  galleryIsScrollable: boolean;
  selectedImage: number | null;
  galleryImagePerPage: number;
  setSelectedImage: (data: number | null) => void;
  setGalleryIsScrollable: (data: boolean) => void;
}

const useArtistsDetailsStore = create(
  devtools<IArtistsStore>((set) => ({
    galleryIsScrollable: true,
    selectedImage: null,
    galleryImagePerPage: 5,
    setSelectedImage: (selectedImage: null | number) =>
      set((state) => ({ ...state, selectedImage })),
    setGalleryIsScrollable: (galleryIsScrollable) =>
      set((state) => ({ ...state, galleryIsScrollable })),
  }))
);

export default useArtistsDetailsStore;
