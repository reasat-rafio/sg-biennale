import { ChevronArrow } from "@components/icons/chevron-arrow";
import { IPgrammeEvents } from "@lib/@types/programmes-events-types";
import { makeDuplicateArray } from "@lib/helpers";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { ProgrammeEventListCard } from "./programme-event-list-card";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface ProgrammesEventListProps {}

export const ProgrammesEventList: React.FC<ProgrammesEventListProps> = ({}) => {
  const router = useRouter();

  const {
    numOfItemsWillIncrease,
    onScreenProgrammesAndEvents,
    allProgrammesAndEvents,
    initialVisibleItems,
    setOnScreenProgrammesAndEvents,
  } = useProgrammesAndEventsStore();

  /* ❓ @Reason: We dont want the main array to modify */
  const duplicateOnScreenProgrammesAndEvents = makeDuplicateArray<
    IPgrammeEvents[]
  >(onScreenProgrammesAndEvents);

  // useEffect(() => {
  //   /* 🚩 Flag to check if the category query present  */
  //   const selectedCategoryFromUrlQuery = router.query.category;

  //   if (selectedCategoryFromUrlQuery) {
  //     /* ❓ Filtering with the selected category from all events and settig  */
  //     const filterdEvents = allProgrammesAndEvents.filter(({ category }) => {
  // const [matchedEvent] = category.filter(
  //   ({ slug: { current } }) => current === selectedCategoryFromUrlQuery
  // );
  //       return matchedEvent;
  //     });

  //     /* ✅ setting the filter events to display */
  //     setOnScreenProgrammesAndEvents(filterdEvents);
  //   }
  // }, [router, allProgrammesAndEvents, setOnScreenProgrammesAndEvents]);

  const viewMoreAction = () => {};
  const viewLessAction = () => {};

  return (
    <div>
      <div className="py-3 text-xl">
        {onScreenProgrammesAndEvents.length} Results
      </div>
      <div className="grid grid-cols-12 lg:gap-8 gap-4">
        {onScreenProgrammesAndEvents?.map((pgrmEvnt) => (
          <ProgrammeEventListCard
            key={pgrmEvnt._id}
            data={pgrmEvnt}
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
          />
        ))}
      </div>

      <div className="flex justify-center items-center my-5">
        <button className="flex space-x-2 items-center">
          <span>View More </span>
          <ChevronArrow className={clsx("h-6 w-6", "rotate-180")} />
        </button>
      </div>
    </div>
  );
};
