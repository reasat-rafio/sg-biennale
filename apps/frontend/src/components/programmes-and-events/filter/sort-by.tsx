import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const SortBy: React.FC<{}> = () => {
  return (
    <div className="z-20">
      <Listbox>
        <div className="relative mt-1">
          <Listbox.Button className="flex items-center w-[300px] | space-x-4 p-3 | border-b border-black cursor-pointer">
            <span className="flex-1 text-left block truncate">Sort By</span>
            <img className="w-[18px]" src="/icons/lines.svg" alt="sort icon" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm | scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 "></Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
