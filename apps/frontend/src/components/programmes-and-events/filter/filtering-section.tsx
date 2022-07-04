import { ChevronArrow } from "@components/icons/chevron-arrow";
import { useState } from "react";
import { Filters } from "./filters";

interface FilteringSectionProps {}

export const FilteringSection: React.FC<FilteringSectionProps> = ({}) => {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <section>
      <div
        className="py-2 border-black border-t flex w-min"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <h6 className="flex-1">Filter</h6>
        <ChevronArrow />
      </div>

      {showFilters && <Filters />}
    </section>
  );
};
