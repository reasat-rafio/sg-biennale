import { IPgrammeEvents } from "./../lib/@types/programmes-events-types";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IProgrammesAndEvents {
  allProgrammesAndEvents: IPgrammeEvents[];
  setAllProgrammesAndEvents: (data: IPgrammeEvents[]) => void;
}

const useProgrammesAndEventsStore = create(
  devtools<IProgrammesAndEvents>((set) => ({
    allProgrammesAndEvents: [],
    setAllProgrammesAndEvents: (allProgrammesAndEvents) =>
      set((state) => ({ ...state, allProgrammesAndEvents })),
  }))
);

export default useProgrammesAndEventsStore;
