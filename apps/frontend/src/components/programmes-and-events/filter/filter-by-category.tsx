import useProgrammesAndEventsStore from "@stores/programme-event-store";
import clsx from "clsx";

interface FilterByCategoryProps {
  className?: string;
}

export const filterHeaderStyles = "py-2 text-xl font-medium";

export const FilterByCategory: React.FC<FilterByCategoryProps> = ({
  className,
}) => {
  const { allCategories } = useProgrammesAndEventsStore();

  return (
    <div className={clsx(className)}>
      <h6>Catagory</h6>

      <ul className="grid grid-cols-12 gap-2">
        {allCategories.map(({ _id, name, slug }) => (
          <li className="col-span-3" key={_id}>
            <input type="radio" value={name} name="gender" />
            <span> {name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
