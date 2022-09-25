import { Container } from "@components/ui/container";
import { FilteringLogic } from "./filtering-logic";
import { FilteringSection } from "./filtering-section";
import {
  positioningAlgo,
  ProgrammesEventList,
} from "../programmes-events-list";
import { Button } from "@components/ui/button";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AllEventsProps {}

export const AllEvents: React.FC<AllEventsProps> = ({}) => {
  const { onScreenProgrammesAndEvents } = useProgrammesAndEventsStore();
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState(onScreenProgrammesAndEvents.slice(0, 5));

  const imgPositionIngAlgo = positioningAlgo(
    onScreenProgrammesAndEvents.length
  );
  const extraPadding = onScreenProgrammesAndEvents.reduce(
    (previousValue, _, idx) => previousValue + 50 * idx,
    0
  );
  const showMoreLessButtonAction = () => {
    events < onScreenProgrammesAndEvents
      ? setPage((prev) => prev + 1)
      : setPage(1);
  };

  useEffect(() => {
    setEvents(onScreenProgrammesAndEvents.slice(0, 5 * page));
  }, [page, onScreenProgrammesAndEvents]);

  return (
    <FilteringLogic>
      <Container className="py-xl flex flex-col space-y-12">
        <header>
          <h2 className="font-medium text-heading-6">All Events</h2>
        </header>
        <FilteringSection />
        <ProgrammesEventList
          events={events}
          extraPadding={extraPadding}
          imgPositionIngAlgo={imgPositionIngAlgo}
        />

        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
        >
          <Button onClick={showMoreLessButtonAction} className="mx-auto">
            {events.length === onScreenProgrammesAndEvents.length
              ? "Show Less"
              : "Show More"}
          </Button>
        </motion.div>
      </Container>
    </FilteringLogic>
  );
};
