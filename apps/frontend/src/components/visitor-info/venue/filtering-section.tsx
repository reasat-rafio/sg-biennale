import { VenueProps } from "@lib/@types/visitor-info.types";
import { Dispatch, SetStateAction } from "react";
import { FilterBy } from "./filters/filter-by";
import { SearchVenue } from "./filters/search-venue";

interface FilteringSectionProps {
  setVenues: Dispatch<SetStateAction<VenueProps[]>>;
  allVenues: VenueProps[];
}

export const FilteringSection: React.FC<FilteringSectionProps> = ({
  setVenues,
  allVenues,
}) => {
  return (
    <section className="grid grid-cols-12 gap-5">
      <div className="xl:col-span-9 md:col-span-6 col-span-12">
        <FilterBy />
      </div>
      <div className="xl:col-span-3 md:col-span-6 col-span-12 ">
        <SearchVenue setVenues={setVenues} allVenues={allVenues} />
      </div>
    </section>
  );
};
