import { VenueProps } from "@lib/@types/visitor-info.types";
import { Dispatch, SetStateAction } from "react";
import { SortBy } from "./filters/sort-by";
import { SearchVenue } from "./filters/search-venue";

interface FilteringSectionProps {}

export const FilteringSection: React.FC<FilteringSectionProps> = ({}) => {
  return (
    <section className="grid grid-cols-12 gap-5">
      <div className="xl:col-span-9 md:col-span-6 col-span-12">
        <SortBy />
      </div>
      <div className="xl:col-span-3 md:col-span-6 col-span-12 ">
        <SearchVenue />
      </div>
    </section>
  );
};
