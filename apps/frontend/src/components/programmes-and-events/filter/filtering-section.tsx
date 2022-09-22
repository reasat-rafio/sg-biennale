import { ChevronArrow } from "@components/icons/chevron-arrow";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { useState } from "react";
import { Filters } from "./filters";

interface FilteringSectionProps {}

export const FilteringSection: React.FC<FilteringSectionProps> = ({}) => {
  const { allCategories } = useProgrammesAndEventsStore();

  return (
    <section className="my-10">
      <header>
        <h2 className="font-medium text-heading-6">All Events</h2>
      </header>
      <div className=""></div>
    </section>
  );
};
