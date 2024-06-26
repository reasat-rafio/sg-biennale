import { Search } from "@components/icons/search";
import useArtistsStore from "@stores/artists.store";
import { ChangeEvent } from "react";

interface SearchByProps {}
export const SearchBy: React.FC<SearchByProps> = ({}) => {
  const { setSearchInput } = useArtistsStore();

  const onChangeAction = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  return (
    <div className="flex items-center w-full | p-3 space-x-3 | border-b border-black cursor-pointer">
      <input
        onChange={onChangeAction}
        className="flex-1 outline-none border-none"
        type="text"
        placeholder="Search Artist"
      />
      <Search />
    </div>
  );
};
