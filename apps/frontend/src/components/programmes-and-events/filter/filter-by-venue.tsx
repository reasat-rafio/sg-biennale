import useProgrammesAndEventsStore from "@stores/programme-event-store";
import clsx from "clsx";
import { filterHeaderStyles } from "./filters";

interface FilterByVenueProps {
  className?: string;
}

export const FilterByVenue: React.FC<FilterByVenueProps> = ({ className }) => {
  const { allVenues } = useProgrammesAndEventsStore();

  return (
    <div className={clsx(className)}>
      <h6 className={filterHeaderStyles}>Venue</h6>

      <select value={allVenues[0].name}>
        {allVenues.map(({ _id, name, slug }) => (
          <option value={name} key={_id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
