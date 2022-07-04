import clsx from "clsx";

interface FilterByDateProps {
  className?: string;
}

export const FilterByDate: React.FC<FilterByDateProps> = ({ className }) => {
  return <div className={clsx(className)}></div>;
};
