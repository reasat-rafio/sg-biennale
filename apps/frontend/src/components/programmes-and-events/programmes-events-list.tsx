import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { ProgrammeEventListCard } from "./programme-event-list-card";

interface ProgrammesEventListProps {}

export const ProgrammesEventList: React.FC<ProgrammesEventListProps> = ({}) => {
  const { visualProgrammesAndEvents, allProgrammesAndEvents } =
    useProgrammesAndEventsStore();
  console.log(visualProgrammesAndEvents);

  return (
    <div>
      <div>{allProgrammesAndEvents.length} Results</div>
      <div className="grid grid-cols-12 lg:gap-8 gap-4">
        {visualProgrammesAndEvents.map((pgrmEvnt) => (
          <ProgrammeEventListCard
            key={pgrmEvnt._id}
            data={pgrmEvnt}
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          />
        ))}
      </div>
    </div>
  );
};
