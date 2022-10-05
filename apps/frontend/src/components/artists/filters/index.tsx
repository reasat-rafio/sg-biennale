import { Container } from "@components/ui/container";
import { SeachBy } from "./search-by";
import { SortByRegion } from "./sort-by-region";

interface IndexProps {}

export const Filters: React.FC<IndexProps> = ({}) => {
  return (
    <Container className="grid grid-cols-12 gap-5 mt-x lg:py-x py-md">
      <div className="xl:col-span-9 md:col-span-6 col-span-12">
        <SortByRegion />
      </div>
      <div className="xl:col-span-3 md:col-span-6 col-span-12 ">
        <SeachBy />
      </div>
    </Container>
  );
};
