import { ArrowNarrowLeft } from "@components/icons/arrow-narrow-left";
import { Calender } from "@components/icons/calender";
import { Location } from "@components/icons/location";
import { EventDescriptionProps } from "@lib/@types/event.types";
import clsx from "clsx";
import Link from "next/link";

export const EventDescription: React.FC<EventDescriptionProps> = ({
  className,
  category,
  title,
  location,
  time,
  date,
}) => {
  console.log(category);

  return (
    <div className={clsx("p-5 flex flex-col space-y-7", className)}>
      <div className="flex">
        <Link href="/event">
          <a className="flex text-sm space-x-2 items-center border-t border-black">
            <ArrowNarrowLeft />
            <span> Back to Programmes & Events</span>
          </a>
        </Link>
      </div>
      <div>
        {category.map(({ id, name }, index) => (
          <h4 className="font-normal" key={id}>
            {index !== 0 || index !== category.length - 1 ? `${name} ,` : name}
          </h4>
        ))}
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>
      <div>
        <div>
          <Location />
          <span>{location}</span>
        </div>
        <div>
          <Calender />
          <span>{time}</span>
        </div>
        <div></div>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
