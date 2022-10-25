import { Container } from "@components/ui/container";
import { FilteringDesktopSection } from "./filters/desktop";
import { ProgrammesEventList } from "./programmes-events-list";
import { Button } from "@components/ui/button";
import useProgrammesAndEventsStore from "@stores/programme-event.store";
import { useCallback } from "react";
import { motion } from "framer-motion";
// import { FilteringMobileSection } from "./filters/mobile";
import { Header } from "@components/ui/header";

interface AllEventsProps {}

export const AllEvents: React.FC<AllEventsProps> = ({}) => {
  const {
    page,
    cardsPerPage,
    sortedProgrammesAndEvents,
    allProgrammesAndEvents,
    setPage,
  } = useProgrammesAndEventsStore();
  const extraPadding = () =>
    useCallback(
      () =>
        sortedProgrammesAndEvents.reduce(
          (previousValue, _) => previousValue + 100,
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
      <section className="flex md:items-stretch items-center  flex-col | md:space-y-6 space-x-2 md:space-x-0">
        <header className="flex-1 md:mb-0 mb-5">
          <Header variant="secondary">All Events</Header>
        </header>
        <FilteringDesktopSection />
      </section>

      <ProgrammesEventList
        events={sortedProgrammesAndEvents}
        extraPadding={extraPadding()}
      />
      {showShowMoreButton && (
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
        >
          <Button
            onClick={showMoreLessButtonAction}
            className="mx-auto relative z-10"
          >
            {sortedProgrammesAndEvents.length === allProgrammesAndEvents.length
              ? "Show Less"
              : "Show More"}
          </Button>
        </motion.div>
      )}
    </Container>
  );
};
