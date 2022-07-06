import { ChevronArrow } from "@components/icons/chevron-arrow";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { ProgrammeEventListCard } from "./programme-event-list-card";
import clsx from "clsx";

interface ProgrammesEventListProps {}

export const ProgrammesEventList: React.FC<ProgrammesEventListProps> = ({}) => {
  const { onScreenProgrammesAndEvents, setOnScreenProgrammesAndEvents } =
    useProgrammesAndEventsStore();

  const viewMoreAction = () => {};
  const viewLessAction = () => {};

  return (
    <div>
      <div className="py-3 text-xl">
        {onScreenProgrammesAndEvents.length} Results
      </div>
      <div className="grid grid-cols-12 | lg:gap-8 gap-4">
        {onScreenProgrammesAndEvents?.map((pgrmEvnt) => (
          <ProgrammeEventListCard
            key={pgrmEvnt._id}
            data={pgrmEvnt}
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          />
        ))}
      </div>

      <div className="flex justify-center items-center | my-5">
        <button className="flex items-center | space-x-2">
          <span>View More </span>
          <ChevronArrow className={clsx("h-6 w-6", "rotate-180")} />
        </button>
      </div>
    </div>
  );
};
