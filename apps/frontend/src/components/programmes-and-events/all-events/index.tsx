import { Container } from "@components/ui/container";
import { FilteringLogic } from "./filtering-logic";
import { FilteringSection } from "./filtering-section";
import { ProgrammesEventList } from "../programmes-events-list";
import { Button } from "@components/ui/button";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { positioningAlgo } from "@lib/helpers/global.helpers";

interface AllEventsProps {}

const cardsPerPage = 6;
export const AllEvents: React.FC<AllEventsProps> = ({}) => {
  const { sortedProgrammesAndEvents } = useProgrammesAndEventsStore();
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState(
    sortedProgrammesAndEvents.slice(0, cardsPerPage)
  );

  const imgPositionIngAlgo = positioningAlgo(events.length);
  const extraPadding = () =>
    useCallback(
      () =>
        events.reduce((previousValue, _, idx) => previousValue + 50 * idx, 0),
      [events]
    );

  const showMoreLessButtonAction = () => {
    events < sortedProgrammesAndEvents
      ? setPage((prev) => prev + 1)
      : setPage(1);
  };

  useEffect(() => {
    setEvents(sortedProgrammesAndEvents.slice(0, cardsPerPage * page));
  }, [page, sortedProgrammesAndEvents]);
  cardsPerPage;

  return (
    <FilteringLogic>
      <Container className="py-xl flex flex-col space-y-12">
        <header>
          <h2 className="font-medium text-heading-6">All Events</h2>
        </header>
        <FilteringSection />
        <ProgrammesEventList
          events={events}
          extraPadding={extraPadding()}
          imgPositionIngAlgo={imgPositionIngAlgo}
        />
        {sortedProgrammesAndEvents.length !== cardsPerPage && (
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
          >
            <Button onClick={showMoreLessButtonAction} className="mx-auto">
              {events.length === sortedProgrammesAndEvents.length
                ? "Show Less"
                : "Show More"}
            </Button>
          </motion.div>
        )}
      </Container>
    </FilteringLogic>
  );
};
