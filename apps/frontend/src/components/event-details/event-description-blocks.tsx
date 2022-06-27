import { ArrowNarrowLeft } from "@components/icons/arrow-narrow-left";
import { Calender } from "@components/icons/calender";
import { Clock } from "@components/icons/clock";
import { Location } from "@components/icons/location";
import { EventDescriptionProps } from "@lib/@types/event.types";
import { PortableText } from "@utils/sanity";

export const Header: React.FC<{
  category: EventDescriptionProps["category"];
  title: string;
}> = ({ category, title }) => {
  return (
    <header>
      {category.map(({ id, name }, index) => (
        <h4 className="font-normal" key={id}>
          {index !== 0 || index !== category.length - 1 ? `${name} ,` : name}
        </h4>
      ))}
      <h1 className="text-2xl font-medium">{title}</h1>
    </header>
  );
};

export const TimeLocationAndDate: React.FC<{
  location: string;
  date: string;
  time: string;
}> = ({ location, date, time }) => {
  const timeLocationAndDate = [
    { icon: <Location className="h-4 w-4" />, title: location },
    { icon: <Calender className="h-4 w-4" />, title: date },
    { icon: <Clock className="h-4 w-4" />, title: time },
  ];
  return (
    <div>
      {timeLocationAndDate.map(({ icon, title }) => (
        <div className="flex space-x-2 items-center text-lg" key={title}>
          {icon}
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
};

export const PriceAndCTA: React.FC<{ price: string }> = ({ price }) => {
  return (
    <div className="text-xl flex">
      <span className="flex-1">S${price}</span>
      <button className="bg-black px-5 py-1 text-white rounded-3xl">
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
