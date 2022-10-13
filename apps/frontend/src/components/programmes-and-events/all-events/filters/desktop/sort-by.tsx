import { AnimatedHamburgerMenu } from "@components/icons/animated-hamburger-menu";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface SortByListProps {
  name: "Alphabet" | "Date";
  id: string;
}

export const SortBy: React.FC<{}> = () => {
  const router = useRouter();
  const sortByList = [
    { name: "Alphabet", id: uuid() },
    { name: "Date", id: uuid() },
  ];

  const [selectedSortType, setSelectedSortType] = useState<
    "Alphabet" | "Date" | null
  >(null);

  const onClickOnSortItemAction = ({ name }: SortByListProps) => {
    router.push(
      { query: { ...router.query, sort_by: name.toLowerCase() } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const onClickOnHamBurgerMenuAction = () => {
    if (selectedSortType !== null) {
      router.push({ query: { ...router.query, sort_by: null } }, undefined, {
        shallow: true,
      });
    }
  };

  /*
  ❓Getting the query from the url and setting them to the state
  @REASON: This stop the state to reset after refresh
  */

  useEffect(() => {
    /* 🚩 Flag to check if the category query present  */
    const selectedSortingFromUrlQuery = router.query.sort_by;
    if (selectedSortingFromUrlQuery) {
      const [matchedVanue] = sortByList.filter(
        ({ name }) => name.toLowerCase() === selectedSortingFromUrlQuery
      );
      setSelectedSortType(matchedVanue.name as any);
    } else setSelectedSortType(null);
  }, [router, sortByList, setSelectedSortType, selectedSortType]);

  return (
    <div className="z-20 col-span-5">
      <Listbox>
        <div className="relative mt-1">
          <Listbox.Button className="flex items-center w-full | space-x-4 p-3 | border-b border-black cursor-pointer">
            <span className="flex-1 text-left block truncate">
              {selectedSortType ? selectedSortType : "Sort By"}
            </span>

            <AnimatedHamburgerMenu
              onClick={onClickOnHamBurgerMenuAction}
              animate={selectedSortType !== null}
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm | scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ">
              {sortByList.map(({ id, name }) => (
                <Listbox.Option
                  key={id}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      active ? "bg-vulcanic text-gray--700" : "text-gray-900"
                    )
                  }
                  value={name}
                  onClick={() => onClickOnSortItemAction({ id, name } as any)}
                >
                  {() => (
                    <>
                      <span
                        className={clsx(
                          "block ",
                          name === selectedSortType
                            ? "font-medium"
                            : "font-normal"
                        )}
                      >
                        {name}
                      </span>
                      {name === selectedSortType && (
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
