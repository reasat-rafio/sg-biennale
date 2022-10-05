import { AnimatedHamburgerMenu } from "@components/icons/animated-hamburger-menu";
import { Listbox, Transition } from "@headlessui/react";
import { Tag } from "@lib/@types/artists.types";
import useArtistsStore from "@stores/artists.store";
import clsx from "clsx";
import { Fragment } from "react";

export const SortByRegion: React.FC<{}> = () => {
  const { selectedRegionSorting, setSelectedRegionSorting, allRegions } =
    useArtistsStore();

  const onClickOnSortItemAction = (region: Tag) =>
    setSelectedRegionSorting(region);

  const onClickOnHamBurgerMenuAction = () =>
    selectedRegionSorting !== null && setSelectedRegionSorting(null);

  return (
    <div className="z-20 relative col-span-5">
      <Listbox>
        <div className="mt-1">
          <Listbox.Button className="flex items-center w-fit | space-x-4 p-3 | border-b border-black cursor-pointer">
            <span className="flex-1 text-left block truncate">
              {selectedRegionSorting?.label
                ? selectedRegionSorting?.label
                : "Sort By Region"}
            </span>

            <AnimatedHamburgerMenu
              onClick={onClickOnHamBurgerMenuAction}
              animate={selectedRegionSorting !== null}
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm | scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ">
              {allRegions.map(({ label, value }) => (
                <Listbox.Option
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      active ? "bg-vulcanic text-gray--700" : "text-gray-900"
                    )
                  }
                  value={label}
                  onClick={() => onClickOnSortItemAction({ label, value })}
                >
                  {() => (
                    <>
                      <span
                        className={clsx(
                          "block ",
                          value === selectedRegionSorting?.value
                            ? "font-medium"
                            : "font-normal"
                        )}
                      >
                        {label}
                      </span>
                      {value === selectedRegionSorting?.value && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-love">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};