import { FilterByCategory } from "./filter-by-category";
import { FilterByVenue } from "./filter-by-venue";
import { SortBy } from "./sort-by";

interface FilteringSectionProps {}

export const FilteringSection: React.FC<FilteringSectionProps> = ({}) => {
  return (
    <section className="my-10">
      <header>
        <h2 className="font-medium text-heading-6">All Events</h2>
      </header>
      <div className="flex space-x-5">
        <div className="flex-1">
          <FilterByVenue />
        </div>
        <div className="flex ">
          <SortBy />
          <FilterByCategory />
        </div>
      </div>
    </section>
  );
};
