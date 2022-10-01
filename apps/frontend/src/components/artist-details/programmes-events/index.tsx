import { Header } from "@components/ui/header";
import { RelatedEventsProps } from "@lib/@types/artist-details.types";
import { ProgrammesEventsCarousel } from "./programmes-events-carousel";

interface ProgrammesEventsProps {
  relatedEvents: RelatedEventsProps[];
  name: string;
}

export const ProgrammesEvents: React.FC<ProgrammesEventsProps> = ({
  relatedEvents,
  name,
}) => {
  return (
    <section className="max-w-[1920px] | 2xl:px-max xl:px-xxl lg:px-x sm:px-lg mx-auto | pt-xl overflow-hidden">
      <header className="mb-16">
        <Header variant="secondary">{name}’s Programmes & Events</Header>
      </header>

      <ProgrammesEventsCarousel relatedEvents={relatedEvents} />
    </section>
  );
};
