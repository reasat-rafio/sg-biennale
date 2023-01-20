import { Button } from "@components/ui/button";
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
      <div className="flex sm:flex-row flex-col items-center | sm:space-x-5 space-y-3 sm:space-y-0 mb-16">
        <header className="flex-1 ">
          <Header className="p-1" variant="secondary">
            {name}’s Programmes & Events
          </Header>
        </header>
        <Button type="href" href="/programmes-events">
          View Events
        </Button>
      </div>

      <ProgrammesEventsCarousel relatedEvents={relatedEvents} />
    </section>
  );
};
