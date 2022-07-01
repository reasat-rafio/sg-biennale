import { ChevronArrow } from "@components/icons/chevron-arrow";
import { IPgrammeEvents } from "@lib/@types/programmes-events-types";
import { makeDuplicateArray } from "@lib/helpers";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { ProgrammeEventListCard } from "./programme-event-list-card";
import clsx from "clsx";

interface ProgrammesEventListProps {}

export const ProgrammesEventList: React.FC<ProgrammesEventListProps> = ({}) => {
  const {
    visualProgrammesAndEvents,
    allProgrammesAndEvents,
    numOfItemsWillIncrease,
    initialVisibleItems,
    setVisualProgrammesAndEvents,
  } = useProgrammesAndEventsStore();

  /* 🚩 Flag for show more and less event */
  let showMore = visualProgrammesAndEvents < allProgrammesAndEvents;

  /* ❓ @Reason: We dont want the main array to modify */
  const duplicateAllProgrammesAndEvents = makeDuplicateArray<IPgrammeEvents[]>(
    allProgrammesAndEvents
  );

  const viewMoreAction = () => {
    const nextChunkOfItems = [
      ...duplicateAllProgrammesAndEvents.splice(
        visualProgrammesAndEvents.length,
        numOfItemsWillIncrease
      ),
    ];
    const newVisualPgrmsAndEvnts = [
      ...visualProgrammesAndEvents,
      ...nextChunkOfItems,
    ];
    setVisualProgrammesAndEvents(newVisualPgrmsAndEvnts);
  };

  const viewLessAction = () => {
    const newVisualPgrmsAndEvnts = visualProgrammesAndEvents.slice(
      0,
      initialVisibleItems
    );
    setVisualProgrammesAndEvents(newVisualPgrmsAndEvnts);
  };

  return (
    <div>
      <div className="py-3 text-xl">
        {allProgrammesAndEvents.length} Results
      </div>
      <div className="grid grid-cols-12 lg:gap-8 gap-4">
        {visualProgrammesAndEvents.map((pgrmEvnt) => (
          <ProgrammeEventListCard
            key={pgrmEvnt._id}
            data={pgrmEvnt}
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          />
        ))}
      </div>

      <div className="flex justify-center items-center my-5">
        <button
          className="flex space-x-2 items-center"
          onClick={showMore ? viewMoreAction : viewLessAction}
        >
          <span>View {showMore ? "More" : "Less"} </span>
          <ChevronArrow
            className={clsx("h-6 w-6", !showMore && "rotate-180")}
          />
        </button>
      </div>
    </div>
  );
};
