import { ArrowNarrowLeft } from "@components/icons/arrow-narrow-left";
import { Calender } from "@components/icons/calender";
import { Clock } from "@components/icons/clock";
import { Location } from "@components/icons/location";
import { EventDescriptionProps, Venue } from "@lib/@types/event.types";
import { convertDate, convertSecondsToAMPM } from "@lib/helpers";
import { PortableText } from "@utils/sanity";

export const Header: React.FC<{
  category: EventDescriptionProps["category"];
  title: string;
}> = ({ category, title }) => {
  return (
    <header>
      {category.map(({ _id, name }, index) => (
        <h4 className="font-normal" key={_id}>
          {index !== 0 || index !== category.length - 1 ? `${name} ,` : name}
        </h4>
      ))}
      <h1 className="text-2xl font-medium">{title}</h1>
    </header>
  );
};

export const TimeLocationAndDate: React.FC<{
  eventEndDate?: Date;
  eventStartDate: Date;
  eventEndTime: number;
  eventStartTime: number;
  venue: Venue[];
}> = ({
  eventEndTime,
  eventStartTime,
  eventStartDate,
  // venue,
  eventEndDate,
}) => {
  const timeLocationAndDate = [
    { icon: <Location className="h-4 w-4" />, title: "location" },
    {
      icon: <Calender className="h-4 w-4" />,
      title: eventEndDate
        ? ` ${convertDate(eventStartDate, false)} - ${convertDate(
            eventEndDate
          )}`
        : `${convertDate(eventStartDate)}`,
    },
    {
      icon: <Clock className="h-4 w-4" />,
      title: `${convertSecondsToAMPM(
        eventStartTime,
        false
      )} - ${convertSecondsToAMPM(eventEndTime, true)}`,
    },
  ];
  return (
    <div>
      {timeLocationAndDate.map(({ icon, title }) => (
        <div className="flex items-center | space-x-2 | text-lg" key={title}>
          {icon}
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
};

export const PriceAndCTA: React.FC<{ price: string }> = ({ price }) => {
  return (
    <div className="flex | text-xl">
      <span className="flex-1">S${price}</span>
      <button className="px-5 py-1 | bg-black text-white | rounded-3xl">
        Back
      </button>
    </div>
  );
};

export const Description: React.FC<{ description: any[] }> = ({
  description,
}) => {
  return (
    <p className="text-sm">
      <PortableText blocks={description} />
    </p>
  );
};
