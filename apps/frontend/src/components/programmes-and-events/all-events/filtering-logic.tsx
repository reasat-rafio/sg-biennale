import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";

interface FilteringLogicProps {
  children: ReactNode;
}

/* 🚩 gatekeeper of the intended queries */
const checkerForTheIntendedQuery = (filteringKeys: string[]) => {
  return filteringKeys.includes("category") || filteringKeys.includes("veneue");
};

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  const router = useRouter();

  const { allProgrammesAndEvents, setSortedProgrammesAndEvents } =
    useProgrammesAndEventsStore();

  useEffect(() => {
    /* 🚩 check if the qury field is not empty */
    const queryParamsNotEmpty = JSON.stringify(router.query) !== "{}";
    const queryKeys = Object.keys(router.query);

    if (queryParamsNotEmpty && checkerForTheIntendedQuery(queryKeys)) {
      const selectedCatagory = router.query.category;
      const selectedVenue = router.query.venue;

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
      setSortedProgrammesAndEvents(filteredEvents);
    }
  }, [router.query, allProgrammesAndEvents, setSortedProgrammesAndEvents]);

  return <>{children}</>;
};
