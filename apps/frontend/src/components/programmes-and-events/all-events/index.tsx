import { Container } from "@components/ui/container";
import { FilteringDesktopSection } from "./filters/desktop";
import { ProgrammesEventList } from "./programmes-events-list";
import { Button } from "@components/ui/button";
import useProgrammesAndEventsStore from "@stores/programme-event.store";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { positioningAlgo } from "@lib/helpers/global.helpers";
import { useWindowSize } from "@lib/hooks";
import { FilteringMobileSection } from "./filters/mobile";

interface AllEventsProps {}

export const AllEvents: React.FC<AllEventsProps> = ({}) => {
  const {
    page,
    cardsPerPage,
    sortedProgrammesAndEvents,
    allProgrammesAndEvents,
    setPage,
  } = useProgrammesAndEventsStore();
  const windowWidth = useWindowSize()?.width ?? 0;
  const imgPositionIngAlgo = positioningAlgo(sortedProgrammesAndEvents.length);
  const extraPadding = () =>
    useCallback(
      () =>
        sortedProgrammesAndEvents.reduce(
          (previousValue, _, idx) => previousValue + 50 * idx,
          0
        ),
      [sortedProgrammesAndEvents]
    );

  const showMoreLessButtonAction = () => {
    sortedProgrammesAndEvents < allProgrammesAndEvents
      ? setPage(page + 1)
      : setPage(1);
  };

  const showShowMoreButton =
    allProgrammesAndEvents.length !== cardsPerPage &&
    allProgrammesAndEvents.length > cardsPerPage;

  return (
    <Container className="py-xl flex-col flex space-y-6 ">
      <section className="flex items-center md:items-stretch md:flex-col | md:space-y-6 space-x-2 md:space-x-0">
        <header className="flex-1">
          <h2 className="font-medium text-heading-6">All Events</h2>
        </header>
        {windowWidth >= 768 ? (
          <FilteringDesktopSection />
        ) : (
          <FilteringMobileSection />
        )}
      </section>

      <ProgrammesEventList
        events={sortedProgrammesAndEvents}
        extraPadding={extraPadding()}
        imgPositionIngAlgo={imgPositionIngAlgo}
      />
      {showShowMoreButton && (
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
        >
          <Button onClick={showMoreLessButtonAction} className="mx-auto">
            {sortedProgrammesAndEvents.length === allProgrammesAndEvents.length
              ? "Show Less"
              : "Show More"}
          </Button>
        </motion.div>
      )}
    </Container>
  );
};
