import { ArtworkProps } from "@lib/@types/artist-details.types";
import create from "zustand";
import { devtools } from "zustand/middleware";

export interface SelectedImageProps {
  index: number;
  artwork: ArtworkProps;
}

interface GalleryAnimationValsProps {
  initialImagePosition: any;
  initialImageScale: any;
}

interface IArtistsStore {
  galleryIsScrollable: boolean;
  selectedCollectionIndex: null | number;
  selectedImage: SelectedImageProps | null;
  galleryImagePerPage: number;
  galleryAnimationVals: GalleryAnimationValsProps | null;
  setGalleryImagePerPage: (data: number) => void;
  setGalleryAnimationVals: (data: GalleryAnimationValsProps | null) => void;
  setSelectedImage: (data: SelectedImageProps | null) => void;
  setGalleryIsScrollable: (data: boolean) => void;
  setSelectedCollectionIndex: (data: null | number) => void;
}

const useArtistsDetailsStore = create(
  devtools<IArtistsStore>((set) => ({
    galleryIsScrollable: true,
    selectedImage: null,
    selectedCollectionIndex: null,
    galleryAnimationVals: null,
    galleryImagePerPage: 6,
    setGalleryAnimationVals: (
      galleryAnimationVals: GalleryAnimationValsProps | null
    ) => set((state) => ({ ...state, galleryAnimationVals })),
    setSelectedImage: (selectedImage: SelectedImageProps | null) =>
      set((state) => ({
        ...state,
        selectedImage,
      })),
    setGalleryIsScrollable: (galleryIsScrollable) =>
      set((state) => ({ ...state, galleryIsScrollable })),
    setGalleryImagePerPage: (galleryImagePerPage) =>
      set((state) => ({ ...state, galleryImagePerPage })),
    setSelectedCollectionIndex: (selectedCollectionIndex) =>
      set((state) => ({ ...state, selectedCollectionIndex })),
  }))
);

export default useArtistsDetailsStore;
