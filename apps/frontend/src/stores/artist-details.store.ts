import { ArtworkProps } from "./../components/artist-details/artwork/artwork";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface SelectedImageProps {
  index: number;
  artwork: ArtworkProps;
}

interface IArtistsStore {
  galleryIsScrollable: boolean;
  selectedImage: SelectedImageProps | null;
  galleryImagePerPage: number;
  setSelectedImage: (data: SelectedImageProps | null) => void;
  setGalleryIsScrollable: (data: boolean) => void;
}

const useArtistsDetailsStore = create(
  devtools<IArtistsStore>((set) => ({
    galleryIsScrollable: true,
    selectedImage: null,
    galleryImagePerPage: 5,
    setSelectedImage: (selectedImage: SelectedImageProps | null) =>
      set((state) => ({
        ...state,
        selectedImage: selectedImage ? selectedImage : null,
      })),
    setGalleryIsScrollable: (galleryIsScrollable) =>
      set((state) => ({ ...state, galleryIsScrollable })),
  }))
);

export default useArtistsDetailsStore;
