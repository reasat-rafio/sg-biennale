import { Container } from "@components/ui/container";
import { FilteringLogic } from "./filtering-logic";
import { FilteringSection } from "./filtering-section";
import { ProgrammesEventList } from "../programmes-events-list";
import { Button } from "@components/ui/button";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { positioningAlgo } from "@lib/helpers/global.helpers";

interface AllEventsProps {}

export const AllEvents: React.FC<AllEventsProps> = ({}) => {
  const {
    page,
    cardsPerPage,
    sortedProgrammesAndEvents,
    allProgrammesAndEvents,
    setPage,
  } = useProgrammesAndEventsStore();

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
    <FilteringLogic>
      <Container className="py-xl flex flex-col space-y-12">
        <header>
          <h2 className="font-medium text-heading-6">All Events</h2>
        </header>
        <FilteringSection />
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
              {sortedProgrammesAndEvents.length ===
              allProgrammesAndEvents.length
                ? "Show Less"
                : "Show More"}
            </Button>
          </motion.div>
        )}
      </Container>
    </FilteringLogic>
  );
};
