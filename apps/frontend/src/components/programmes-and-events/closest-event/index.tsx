import { Header } from "@components/ui/header";
import { IPgrammeEvents } from "@lib/@types/programmes-events.types";
import { ClosestEventCarousel } from "./closest-event-carousel";

interface ClosestEventProps {
  events: IPgrammeEvents[];
}

export const ClosestEvent: React.FC<ClosestEventProps> = ({ events }) => {
  const closestEventArr = events
    .sort((a, b) => (a.startAt > b.startAt ? 1 : -1))
    .slice(0, 4);

  return (
    <section className="max-w-[1920px] | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg mx-auto | pt-xl overflow-hidden">
      <header className="mb-16">
        <Header variant="secondary">Closest event</Header>
      </header>

      <ClosestEventCarousel closestEventArr={closestEventArr} />
    </section>
  );
};
