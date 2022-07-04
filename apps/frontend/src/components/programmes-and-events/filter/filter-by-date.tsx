import clsx from "clsx";
import { filterHeaderStyles } from "./filters";

interface FilterByDateProps {
  className?: string;
}

export const FilterByDate: React.FC<FilterByDateProps> = ({ className }) => {
  return (
    <div className={clsx(className)}>
      <h6 className={filterHeaderStyles}>Dates</h6>

      <ul className="flex gap-2 flex-wrap justify-between">
        <li className=" ">
          <input type="radio" name="Today" /> <span>Today</span>
        </li>
        <li className="">
          <span>
            <input type="radio" name="Choose a date" />{" "}
            <span>Choose a date</span>
          </span>

          <input className="mx-2" type="date" />
        </li>
        <li className="">
          <input type="radio" name="This week" /> <span>This week</span>
        </li>
      </ul>
    </div>
  );
};
