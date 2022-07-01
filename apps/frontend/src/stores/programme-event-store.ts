import { IPgrammeEvents } from "./../lib/@types/programmes-events-types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IProgrammesAndEvents {
  allProgrammesAndEvents: IPgrammeEvents[];
  visualProgrammesAndEvents: IPgrammeEvents[];
  setAllProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
  setVisualProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
}

const useProgrammesAndEventsStore = create(
  devtools<IProgrammesAndEvents>((set) => ({
    allProgrammesAndEvents: [],
    visualProgrammesAndEvents: [],
    setAllProgrammesAndEvents: (allProgrammesAndEvents) =>
      set((state) => ({ ...state, allProgrammesAndEvents })),
    setVisualProgrammesAndEvents: (visualProgrammesAndEvents) =>
      set((state) => ({ ...state, visualProgrammesAndEvents })),
  }))
);

export default useProgrammesAndEventsStore;
