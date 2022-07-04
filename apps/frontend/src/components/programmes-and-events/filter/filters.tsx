import clsx from "clsx";
import { FilterByCategory } from "./filter-by-category";
import { FilterByDate } from "./filter-by-date";
import { FilterByVenue } from "./filter-by-venue";

interface FiltersProps {}

export const Filters: React.FC<FiltersProps> = ({}) => {
  return (
    <div className="grid grid-cols-12 gap-10">
      <FilterByDate className="col-span-3" />
      <FilterByCategory className="col-span-6" />
      <FilterByVenue className="col-span-3" />
    </div>
  );
};
