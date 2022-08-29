import { ArtworkProps } from "./../components/artist-details/artwork/artwork";
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
  selectedImage: SelectedImageProps | null;
  galleryImagePerPage: number;
  galleryAnimationVals: GalleryAnimationValsProps | null;
  setGalleryImagePerPage: (data: number) => void;
  setGalleryAnimationVals: (data: GalleryAnimationValsProps | null) => void;
  setSelectedImage: (data: SelectedImageProps | null) => void;
  setGalleryIsScrollable: (data: boolean) => void;
}

const useArtistsDetailsStore = create(
  devtools<IArtistsStore>((set) => ({
    galleryIsScrollable: true,
    selectedImage: null,
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
  }))
);

export default useArtistsDetailsStore;
