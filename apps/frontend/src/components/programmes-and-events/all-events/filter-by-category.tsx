import useProgrammesAndEventsStore from "@stores/programme-event.store";
import { Fragment, MouseEvent, useEffect, useState } from "react";
import { AllCategoriesProps } from "@lib/@types/programmes-events-types";
import { useRouter } from "next/router";
import { Listbox, Transition } from "@headlessui/react";
import { X } from "@components/icons/x";
import clsx from "clsx";

export const FilterByCategory: React.FC<{}> = () => {
  const router = useRouter();
  const { allCategories } = useProgrammesAndEventsStore();
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  /*
  ❓Getting the query from the url and setting them to the state
  @REASON: This stop the state to reset after refresh
  */
  useEffect(() => {
    /* 🚩 Flag to check if the category query present  */
    const selectedCategoryFromUrlQuery = router.query.category;
    if (selectedCategoryFromUrlQuery) {
      /* ❓Filtering out the events from allCategories */
      const [findThecategory] = allCategories.filter(
        ({ slug }) => slug.current === selectedCategoryFromUrlQuery
      );
      setSelectedCategory(findThecategory?.name);
    }
  }, [router, allCategories, setSelectedCategory]);

  const onClickAction = (_category: AllCategoriesProps) => {
    setSelectedCategory(_category.name);
    // ✅ setting the filter query
    router.push(
      { query: { ...router.query, category: _category?.slug.current } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const removeCategoryFilteringAction = (e: MouseEvent<SVGSVGElement, any>) => {
    e.stopPropagation();
    setSelectedCategory(null);
    router.push({ query: { ...router.query, category: null } }, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="z-20 col-span-7">
      <Listbox value={selectedCategory}>
        <div className="relative mt-1">
          <Listbox.Button className="flex items-center w-full | space-x-4 p-3 | border-b border-black cursor-pointer">
            <span className="flex-1 text-left block truncate">
              {selectedCategory ? selectedCategory : "Category"}
            </span>
            {selectedCategory && (
              <X
                onClick={removeCategoryFilteringAction}
                className="h-7 w-7 rounded-full | p-1 | bg-white hover:scale-105 hover:bg-gray-300 | transition-colors duration-300"
              />
            )}
            <img className="w-[18px]" src="/icons/sort.svg" alt="sort icon" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm | scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ">
              {allCategories.map((category) => (
                <Listbox.Option
                  key={category._id}
                  onClick={() => onClickAction(category)}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      active ? "bg-vulcanic text-gray--700" : "text-gray-900"
                    )
                  }
                  value={category}
                >
                  {() => (
                    <>
                      <span
                        className={clsx(
                          "block truncate",
                          category.name === selectedCategory
                            ? "font-medium"
                            : "font-normal"
                        )}
                      >
                        {category.name}
                      </span>
                      {category.name === selectedCategory && (
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
