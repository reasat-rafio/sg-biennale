import { Container } from "@components/ui/container";
import { IPgrammeEvents } from "@lib/@types/programmes-events-types";
import { ClosestEventCarousel } from "./closest-event-carousel";

interface ClosestEventProps {
  events: IPgrammeEvents[];
}

export const ClosestEvent: React.FC<ClosestEventProps> = ({ events }) => {
  const closestEventArr = events
    .sort((a, b) => (a.startAt > b.startAt ? 1 : -1))
    .slice(0, 4);

  return (
    <Container className="pt-xl overflow-hidden">
      <header className="mb-16">
        <h2 className="font-medium md:text-heading-6 text-3xl">
          Closest event
        </h2>
      </header>

      <ClosestEventCarousel closestEventArr={closestEventArr} />
    </Container>
  );
};
