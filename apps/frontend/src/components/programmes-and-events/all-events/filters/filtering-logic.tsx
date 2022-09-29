import useProgrammesAndEventsStore from "@stores/programme-event.store";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";

interface FilteringLogicProps {
  children: ReactNode;
}

/* 🚩 gatekeeper of the intended queries */
const checkerForTheIntendedQuery = (filteringKeys: string[]) => {
  return (
    filteringKeys.includes("category") ||
    filteringKeys.includes("veneue") ||
    filteringKeys.includes("sort_by")
  );
};

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  const router = useRouter();

  const {
    page,
    cardsPerPage,
    allProgrammesAndEvents,
    setSortedProgrammesAndEvents,
  } = useProgrammesAndEventsStore();

  useEffect(() => {
    /* 🚩 check if the qury field is not empty */
    const queryParamsNotEmpty = JSON.stringify(router.query) !== "{}";
    const queryKeys = Object.keys(router.query);

    if (queryParamsNotEmpty && checkerForTheIntendedQuery(queryKeys)) {
      const selectedCatagory = router.query.category;
      const selectedVenue = router.query.venue;
      const selectedSorting = router.query.sort_by;

      const filteredEvents = allProgrammesAndEvents
        .filter((event) => {
          if (selectedCatagory) {
            const [matchedEvent] = event.category.filter(
              ({ slug: { current } }) => current === selectedCatagory
            );
            return matchedEvent;
          } else {
            return event;
          }
        })
        .filter((event) => {
          if (selectedVenue) {
            const [matchedVanue] = event.venue.filter(
              ({ slug: { current } }) => current === selectedVenue
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

      // Show More Filtering
      setSortedProgrammesAndEvents(
        filteredEvents.slice(0, cardsPerPage * page)
      );
    }
  }, [
    page,
    router.query,
    allProgrammesAndEvents,
    setSortedProgrammesAndEvents,
  ]);

  return <>{children}</>;
};
