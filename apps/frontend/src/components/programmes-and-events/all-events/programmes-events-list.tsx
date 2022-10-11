import { IPgrammeEvents } from "@lib/@types/programmes-events.types";
import { ProgrammeEventListCard } from "./programme-event-list-card";

interface ProgrammesEventListProps {
  events: IPgrammeEvents[];
  extraPadding: () => number;
}

export const ProgrammesEventList: React.FC<ProgrammesEventListProps> = ({
  extraPadding,
  events,
}) => {
  return (
    <section className="pt-2" style={{ paddingBottom: extraPadding() / 2 }}>
      <div className="grid grid-cols-12 | lg:gap-8 gap-4">
        {events?.map((pgrmEvnt, index) => (
          <ProgrammeEventListCard
            {...pgrmEvnt}
            key={pgrmEvnt._id}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};
