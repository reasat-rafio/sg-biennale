import useProgrammesAndEventsStore from "@stores/programme-event-store";
import clsx from "clsx";
import { filterHeaderStyles } from "./filters";
import { useEffect, useState } from "react";
import { AllCategoriesProps } from "@lib/@types/programmes-events-types";
import { useRouter } from "next/router";

interface FilterByCategoryProps {
  className?: string;
}

export const FilterByCategory: React.FC<FilterByCategoryProps> = ({
  className,
}) => {
  const router = useRouter();

  const { allCategories } = useProgrammesAndEventsStore();
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  const onClickAction = (_category: AllCategoriesProps) => {
    setSelectedCategory(_category._id);
    // ✅ setting the filter query
    router.push(
      { query: { ...router.query, category: _category?.slug.current } },
      undefined,
      {
        shallow: true,
      }
    );
  };

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
      setSelectedCategory(findThecategory?._id);
    }
  }, [router, allCategories]);

  return (
    <div className={clsx(className)}>
      <h6 className={filterHeaderStyles}>Category</h6>

      <ul className="grid grid-cols-12 | gap-2">
        {allCategories.map(({ _id, name, slug }) => (
          <li
            className="col-span-3 | cursor-pointer"
            key={_id}
            onClick={() => onClickAction({ _id, name, slug })}
          >
            <input
              checked={selectedCategory === _id}
              type="radio"
              value={name}
              name="gender"
            />
            <span> {name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
