import { ChevronArrow } from "@components/icons/chevron-arrow";
import { IPgrammeEvents } from "@lib/@types/programmes-events-types";
import { makeDuplicateArray } from "@lib/helpers";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { ProgrammeEventListCard } from "./programme-event-list-card";
import clsx from "clsx";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    /* 🚩 Flag to check if the category query present  */
    const selectedCategoryFromUrlQuery = router.query.category;

    if (selectedCategoryFromUrlQuery) {
      /* ❓ Filtering with the selected category from all events and settig  */
      const filterdEvents = allProgrammesAndEvents.filter(({ category }) => {
        const [matchedEvent] = category.filter(
          ({ slug: { current } }) => current === selectedCategoryFromUrlQuery
        );
        return matchedEvent;
      });

      /* ✅ setting the filter events to display */
      setOnScreenProgrammesAndEvents(filterdEvents);
    }
  }, [router, allProgrammesAndEvents, setOnScreenProgrammesAndEvents]);

  // const matchedItems = duplicateVisualProgrammesAndEvents.filter((o1) =>
  //   duplicateAllProgrammesAndEvents.some((o2) => o1._id === o2._id)
  // );

  const viewMoreAction = () => {
    // const nextChunkOfItems = [
    //   ...matchedItems.splice(
    //     onScreenProgrammesAndEvents.length,
    //     numOfItemsWillIncrease
    //   ),
    // ];
    // const newVisualPgrmsAndEvnts = [
    //   ...onScreenProgrammesAndEvents,
    //   ...nextChunkOfItems,
    // ];
    // setOnScreenProgrammesAndEvents(newVisualPgrmsAndEvnts);
  };

  const viewLessAction = () => {
    const newVisualPgrmsAndEvnts = onScreenProgrammesAndEvents.slice(
      0,
      initialVisibleItems
    );
    setOnScreenProgrammesAndEvents(newVisualPgrmsAndEvnts);
  };

  /* 🚩 Flag for show more and less event */
  // let showMore = onScreenProgrammesAndEvents < matchedItems;

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
        <button
          className="flex space-x-2 items-center"
          // onClick={showMore ? viewMoreAction : viewLessAction}
          // onClick={viewMoreAction}
        >
          {/* <span>View {showMore ? "More" : "Less"} </span> */}
          <span>View More </span>
          <ChevronArrow
            // className={clsx("h-6 w-6", !showMore && "rotate-180")}
            className={clsx("h-6 w-6", "rotate-180")}
          />
        </button>
      </div>
    </div>
  );
};
