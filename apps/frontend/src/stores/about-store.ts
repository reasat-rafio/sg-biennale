import create from "zustand/react";

const setScrollYPosition = () => {};

interface AboutStoreProps {
  // setScrollYPositions: (data: number[]) =>
}

const useAboutStore = create<AboutStoreProps>((set) => ({
  scrollYPositions: [],
}));

export default useAboutStore;
