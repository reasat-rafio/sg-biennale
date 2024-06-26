import { Header } from "@components/ui/header";
import { IPgrammeEvents } from "@lib/@types/programmes-events.types";
import { ClosestEventCarousel } from "./closest-event-carousel";

interface ClosestEventProps {
  closestEvents: IPgrammeEvents[];
  header: string;
}

const ClosestEvent: React.FC<ClosestEventProps> = ({
  header,
  closestEvents,
}) => {
  return (
    <section className="max-w-[1920px] | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg mx-auto | pt-xl overflow-hidden">
      <header className="mb-16 px-md sm:px-0">
        <Header variant="secondary">{header}</Header>
      </header>

      <ClosestEventCarousel closestEventArr={closestEvents} />
    </section>
  );
};

export default ClosestEvent;
