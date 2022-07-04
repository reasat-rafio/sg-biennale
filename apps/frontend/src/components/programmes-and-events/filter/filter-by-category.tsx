import clsx from "clsx";

interface FilterByCategoryProps {
  className?: string;
}

export const FilterByCategory: React.FC<FilterByCategoryProps> = ({
  className,
}) => {
  return <div className={clsx(className)}></div>;
};
