import { FilterByCategory } from "./filter-by-category";
import { FilterByVenue } from "./filter-by-venue";
import { SortBy } from "./sort-by";

interface FilteringSectionProps {}

export const FilteringSection: React.FC<FilteringSectionProps> = ({}) => {
  return (
    <section className="grid grid-cols-12 gap-5">
      <div className="xl:col-span-7 md:col-span-6 col-span-12">
        <FilterByVenue />
      </div>
      <div className="xl:col-span-5 md:col-span-6 col-span-12 | grid grid-cols-12 gap-5">
        <SortBy />
        <FilterByCategory />
      </div>
    </section>
  );
};
