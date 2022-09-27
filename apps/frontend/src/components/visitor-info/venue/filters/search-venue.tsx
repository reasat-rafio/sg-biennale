import { Search } from "@components/icons/search";
import useVisitorInfoStore from "@stores/visitor-info.store";
import { ChangeEvent } from "react";

interface SearchVenueProps {}
export const SearchVenue: React.FC<SearchVenueProps> = ({}) => {
  const { setSearchInput } = useVisitorInfoStore();

  const onChangeAction = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase());
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
