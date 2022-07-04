import clsx from "clsx";

interface FilterByVenueProps {
  className?: string;
}

export const FilterByVenue: React.FC<FilterByVenueProps> = ({ className }) => {
  return <div className={clsx(className)}></div>;
};
