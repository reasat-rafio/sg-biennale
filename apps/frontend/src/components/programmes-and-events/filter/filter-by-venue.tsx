import { AllVenuesProps } from "@lib/@types/programmes-events-types";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { filterHeaderStyles } from "./filters";

interface FilterByVenueProps {
  className?: string;
}

export const FilterByVenue: React.FC<FilterByVenueProps> = ({ className }) => {
  const { allVenues } = useProgrammesAndEventsStore();
  const [selectedVenue, setSelectedVenue] = useState<null | AllVenuesProps>(
    null
  );

  const onChangeAction = (e: ChangeEvent<HTMLSelectElement>) => {
    const [findSelectedVenue] = allVenues.filter(
      (vanue) => vanue.slug.current === e.target.value
    );
    setSelectedVenue(findSelectedVenue);
  };

  return (
    <div className={clsx(className)}>
      <h6 className={filterHeaderStyles}>Venue</h6>

      <select
        onChange={onChangeAction}
        value={selectedVenue?.slug.current ?? allVenues[0]?.slug.current}
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
