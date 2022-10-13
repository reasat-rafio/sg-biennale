import useProgrammesAndEventsStore from "@stores/programme-event.store";
import { ReactNode, useEffect } from "react";

interface FilteringLogicProps {
  children: ReactNode;
}

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  const {
    page,
    cardsPerPage,
    allProgrammesAndEvents,
    selectedCategory,
    selectedVenue,
    selectedSorting,
    setSortedProgrammesAndEvents,
  } = useProgrammesAndEventsStore();

  useEffect(() => {
    let filteredEvents = allProgrammesAndEvents;
    if (selectedSorting || selectedVenue || selectedCategory) {
      filteredEvents = allProgrammesAndEvents
        .filter((event) => {
          if (selectedCategory) {
            const [matchedEvent] = event.category.filter(
              ({ slug: { current } }) =>
                current === selectedCategory.slug.current
            );
            return matchedEvent;
          } else {
            return event;
          }
        })
        .filter((event) => {
          if (selectedVenue) {
            const [matchedVanue] = event.venue.filter(
              ({ slug: { current } }) => {
                console.log(current, selectedVenue.slug.current);
                return current === selectedVenue.slug.current;
              }
            );

            return matchedVanue;
          } else {
            return event;
          }
        });

      if (selectedSorting === "alphabet") {
        filteredEvents.sort((a, b) => (a.title > b.title ? 1 : -1));
      } else if (selectedSorting === "date") {
        filteredEvents.sort((a, b) => (a.startAt > b.startAt ? 1 : -1));
      }
      setSortedProgrammesAndEvents(
        filteredEvents.slice(0, cardsPerPage * page)
      );
    }
    // Show More Filtering
    setSortedProgrammesAndEvents(filteredEvents.slice(0, cardsPerPage * page));
  }, [
    page,
    selectedCategory,
    selectedVenue,
    selectedSorting,
    allProgrammesAndEvents,
    setSortedProgrammesAndEvents,
  ]);

  return <>{children}</>;
};
