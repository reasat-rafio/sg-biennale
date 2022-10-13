import useProgrammesAndEventsStore from "@stores/programme-event.store";
import { Dispatch, SetStateAction } from "react";
import { AllCategoriesProps } from "@lib/@types/programmes-events.types";
import { Checkbox } from "./checkbox";
import { motion } from "framer-motion";
import { SortIcon } from "@components/icons/sort";

interface FilterByCategoryProps {
  setShowCategoryDropdown: Dispatch<SetStateAction<boolean>>;
}

export const FilterByCategory: React.FC<FilterByCategoryProps> = ({
  setShowCategoryDropdown,
}) => {
  const { selectedCategory } = useProgrammesAndEventsStore();

  return (
    <div className="z-20 col-span-7 mt-1">
      <div
        onClick={() => setShowCategoryDropdown((prev) => !prev)}
        className="flex items-center w-full | space-x-4 p-3 | border-b border-black cursor-pointer"
      >
        <span className="flex-1 text-left block truncate">
          {selectedCategory?.name ? selectedCategory.name : "Category"}
        </span>

        <SortIcon />
      </div>
    </div>
  );
};

export const CategoryDropdown: React.FC<{
  showCategoryDropdown: boolean;
}> = ({ showCategoryDropdown }) => {
  const { allCategories, selectedCategory, setSelectedCategory } =
    useProgrammesAndEventsStore();

  const onClickAction = (category: AllCategoriesProps) => {
    if (category.name === selectedCategory?.name) setSelectedCategory(null);
    else setSelectedCategory(category);
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
      <ul className="grid grid-cols-12 gap-3">
        {allCategories.map(({ _id, name, slug }) => (
          <li
            onClick={() => onClickAction({ _id, name, slug })}
            className="xl:col-span-3 md:col-span-4 col-span-6  flex items-center | space-x-3 | cursor-pointer my-2"
            key={_id}
          >
            <Checkbox check={_id === selectedCategory?._id} />{" "}
            <span className="truncate">{name}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
