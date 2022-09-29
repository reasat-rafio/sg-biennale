import { Search } from "@components/icons/search";
import { Container } from "@components/ui/container";
// import { Title } from "@components/ui/title";
import { filterLogicFactory } from "@lib/helpers/artists.helper";
import useArtistsStore from "@stores/artists.store";
import { useRouter } from "next/router";
import { useRef } from "react";
import { FilterByCountry } from "./filter-by-country";
import { FilterByVenue } from "./filter-by-venue";

export const Filtering: React.FC<{}> = () => {
  const { allArtists, setFilteredArtists } = useArtistsStore();

  const router = useRouter();

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const onSearchAction = () => {
    const searchInputValue = searchRef.current?.value;

    if (!searchInputValue || searchInputValue === "")
      setFilteredArtists(filterLogicFactory(allArtists, router));
    else {
      const filteredArtist = filterLogicFactory(allArtists, router).filter(
        ({ name }) =>
          name
            .toLowerCase()
            .trim()
            .includes((searchInputValue as string).toLowerCase().trim())
      );
      setFilteredArtists(filteredArtist);
    }
  };

  return (
    <Container className="flex lg:flex-row flex-col items-center | py-5 ">
      <div className="flex-1 flex items-center lg:flex-row flex-col | space-x-6 mb-3 lg:mb-0">
        {/* <Title>Artist & Collaborators</Title> */}

        <div className="flex | lg:space-x-6 space-x-3">
          <FilterByCountry />
          <FilterByVenue />
        </div>
      </div>
      <div className="relative lg:w-[350px] w-auto | flex | py-1 | border-2 border-black | rounded-3xl">
        <input
          onChange={onSearchAction}
          ref={searchRef}
          className="flex-1 | pl-3 | bg-transparent outline-none"
          placeholder="Search"
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
