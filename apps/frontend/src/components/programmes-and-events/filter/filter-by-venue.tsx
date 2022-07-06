import { AllVenuesProps } from "@lib/@types/programmes-events-types";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { filterHeaderStyles } from "./filters";

interface FilterByVenueProps {
  className?: string;
}

export const FilterByVenue: React.FC<FilterByVenueProps> = ({ className }) => {
  const router = useRouter();

  const { allVenues } = useProgrammesAndEventsStore();
  const [selectedVenue, setSelectedVenue] = useState<null | string>(null);

  const onChangeAction = (e: ChangeEvent<HTMLSelectElement>) => {
    const [findSelectedVenue] = allVenues.filter(
      (vanue) => vanue.slug.current === e.target.value
    );
    router.push(
      { query: { ...router.query, venue: findSelectedVenue.slug.current } },
      undefined,
      {
        shallow: true,
      }
    );
    setSelectedVenue(findSelectedVenue.slug.current);
  };

  /*
  ❓Getting the query from the url and setting them to the state
  @REASON: This stop the state to reset after refresh
  */
  useEffect(() => {
    /* 🚩 Flag to check if the category query present  */
    const selectedVenueFromUrlQuery = router.query.venue;

    if (selectedVenueFromUrlQuery) {
      /* ❓Filtering out the events from allCategories */
      const [matchedVanue] = allVenues.filter(
        ({ slug }) => slug.current === selectedVenueFromUrlQuery
      );
      setSelectedVenue(matchedVanue.slug.current);
    }
  }, [router, allVenues]);

  return (
    <div className={clsx(className)}>
      <h6 className={filterHeaderStyles}>Venue</h6>

      <select
        onChange={onChangeAction}
        value={selectedVenue ?? allVenues[0]?.slug.current}
      >
        {allVenues.map(({ _id, name, slug }) => (
          <option value={slug.current} key={_id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
