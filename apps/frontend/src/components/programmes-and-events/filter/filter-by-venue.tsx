import { AllVenuesProps } from "@lib/@types/programmes-events-types";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
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
