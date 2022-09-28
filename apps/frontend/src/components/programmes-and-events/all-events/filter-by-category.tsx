import useProgrammesAndEventsStore from "@stores/programme-event.store";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { AllCategoriesProps } from "@lib/@types/programmes-events-types";
import { Checkbox } from "./checkbox";
import { motion } from "framer-motion";

interface FilterByCategoryProps {
  selectedCategory: string | null;
  setShowCategoryDropdown: Dispatch<SetStateAction<boolean>>;
}

export const FilterByCategory: React.FC<FilterByCategoryProps> = ({
  selectedCategory,
  setShowCategoryDropdown,
}) => {
  return (
    <div className="z-20 col-span-7 mt-1">
      <div
        onClick={() => setShowCategoryDropdown((prev) => !prev)}
        className="flex items-center w-full | space-x-4 p-3 | border-b border-black cursor-pointer"
      >
        <span className="flex-1 text-left block truncate">
          {selectedCategory ? selectedCategory : "Category"}
        </span>

        <img className="w-[18px]" src="/icons/sort.svg" alt="sort icon" />
      </div>
    </div>
  );
};

export const CategoryDropdown: React.FC<{
  showCategoryDropdown: boolean;
  selectedCategory: null | string;
  setSelectedCategory: Dispatch<SetStateAction<null | string>>;
}> = ({ showCategoryDropdown, selectedCategory, setSelectedCategory }) => {
  const router = useRouter();
  const { allCategories } = useProgrammesAndEventsStore();

  const onClickAction = (category: AllCategoriesProps) => {
    if (category.name === selectedCategory) {
      setSelectedCategory(null);
      router.push({ query: { ...router.query, category: null } }, undefined, {
        shallow: true,
      });
    } else {
      setSelectedCategory(category.name);
      router.push(
        { query: { ...router.query, category: category?.slug.current } },
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

  return (
    <motion.div
      className="mt-5"
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: showCategoryDropdown ? "auto" : 0,
        opacity: showCategoryDropdown ? 1 : 0,
      }}
      transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
    >
      <ul className="flex items-center space-x-5 flex-wrap">
        {allCategories.map(({ _id, name, slug }) => (
          <li
            onClick={() => onClickAction({ _id, name, slug })}
            className="flex items-center | space-x-3 flex-wrap | cursor-pointer my-2"
            key={_id}
          >
            <Checkbox check={name === selectedCategory} /> <span>{name}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
