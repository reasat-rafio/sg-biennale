import { Container } from "@components/ui/container";
import { FilteringLogic } from "./filtering-logic";
import { FilteringSection } from "./filtering-section";
import { ProgrammesEventList } from "../programmes-events-list";
import { Button } from "@components/ui/button";

interface AllEventsProps {}

export const AllEvents: React.FC<AllEventsProps> = ({}) => {
  return (
    <FilteringLogic>
      <Container className="py-xl flex flex-col space-y-12">
        <header>
          <h2 className="font-medium text-heading-6">All Events</h2>
        </header>
        <FilteringSection />
        <ProgrammesEventList />

        <div>
          <Button className="mx-auto">View More</Button>
        </div>
      </Container>
    </FilteringLogic>
  );
};
