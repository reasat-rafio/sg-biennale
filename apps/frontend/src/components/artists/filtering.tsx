import { Search } from "@components/icons/search";
import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { useRef } from "react";

interface FilteringProps {}

export const Filtering: React.FC<FilteringProps> = ({}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Container className="flex lg:flex-row flex-col items-center | py-5 ">
      <div className="flex-1 flex items-center | space-x-6">
        <Header>Artist</Header>
        <button className="px-4 py-1 | border-2 border-black | rounded-3xl ">
          Sort by
        </button>
      </div>
      <div className="relative lg:w-[350px] w-auto | flex | py-1 | border-2 border-black | rounded-3xl">
        <input
          className="flex-1 | pl-3 | bg-transparent outline-none"
          placeholder="Email"
          type="text"
          style={{ marginRight: `${btnRef.current?.clientWidth! + 10}px` }}
        />
        <button ref={btnRef} className="absolute right-0 top-0 h-full px-2">
          <Search />
        </button>
      </div>
    </Container>
  );
};
