import { ChevronArrow } from "@components/icons/chevron-arrow";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { useState } from "react";
import { Filters } from "./filters";

interface FilteringSectionProps {}

export const FilteringSection: React.FC<FilteringSectionProps> = ({}) => {
  const { allCategories } = useProgrammesAndEventsStore();

  return (
    <section className="my-10">
      <div className="">
        {allCategories.map(({ name, _id }) => (
          <span
            key={_id}
            className=" text-body-1 text-gray--700 font-manrope flex justify-center items-center"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
};
