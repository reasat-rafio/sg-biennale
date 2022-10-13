import React, { useState } from "react";
import { CategoryDropdown, FilterByCategory } from "./filter-by-category";
import { FilterByVenue } from "./filter-by-venue";
import { SortBy } from "./sort-by";

interface FilteringSectionProps {}

export const FilteringDesktopSection: React.FC<
  FilteringSectionProps
> = ({}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  return (
    <section>
      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-7 md:col-span-6 col-span-12">
          <FilterByVenue />
        </div>
        <div className="xl:col-span-5 md:col-span-6 col-span-12 | grid grid-cols-12 gap-5">
          <SortBy />
          <FilterByCategory setShowCategoryDropdown={setShowCategoryDropdown} />
        </div>
      </div>

      <CategoryDropdown showCategoryDropdown={showCategoryDropdown} />
    </section>
  );
};
