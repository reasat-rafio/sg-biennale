import { Search } from "@components/icons/search";
import { VenueProps } from "@lib/@types/visitor-info.types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SearchVenueProps {
  setVenues: Dispatch<SetStateAction<VenueProps[]>>;
  allVenues: VenueProps[];
}

export const SearchVenue: React.FC<SearchVenueProps> = ({
  allVenues,
  setVenues,
}) => {
  const onChangeAction = (e: ChangeEvent<HTMLInputElement>) => {
    const filterVenues = allVenues.filter(({ name }) =>
      name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setVenues(filterVenues);
  };

  return (
    <div className="flex items-center w-full | p-3 space-x-3 | border-b border-black cursor-pointer">
      <input
        onChange={onChangeAction}
        className="flex-1 outline-none border-none"
        type="text"
        placeholder="Seach Venue"
      />
      <Search />
    </div>
  );
};
