import { ArrowNarrowLeft } from "@components/icons/arrow-narrow-left";
import { Calender } from "@components/icons/calender";
import { ChevronArrow } from "@components/icons/chevron-arrow";
import { Clock } from "@components/icons/clock";
import { Location } from "@components/icons/location";
import { EventDescriptionProps } from "@lib/@types/event.types";
import { PortableText } from "@utils/sanity";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export const GoBack: React.FC<{}> = () => {
  return (
    <div className="flex">
      <Link href="/event">
        <a className="flex text-sm space-x-2 items-center border-t border-black">
          <ArrowNarrowLeft />
          <span> Back to Programmes & Events</span>
        </a>
      </Link>
    </div>
  );
};

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

export const Accordions: React.FC<{
  moreInfo: EventDescriptionProps["moreInfo"];
}> = ({ moreInfo }) => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<
    number | null
  >(null);

  const toggleAccordion = (accordionIndex: number) => {
    if (activeAccordionIndex === accordionIndex) setActiveAccordionIndex(null);
    else setActiveAccordionIndex(accordionIndex);
  };
  return (
    <div className="border-t border-black py-2">
      {moreInfo?.map(({ key, title, description }, index) => (
        <div
          className="flex flex-col space-y-2"
          onClick={() => {
            toggleAccordion(index);
          }}
          key={key}
        >
          <div className="text-sm font-medium flex items-center">
            <h6 className="flex-1">{title}</h6>
            <ChevronArrow
              className={clsx(
                "h-4 w-4",
                index === activeAccordionIndex ? "rotate-180" : ""
              )}
            />
          </div>
          {index === activeAccordionIndex && <p>{description}</p>}
        </div>
      ))}
    </div>
  );
};
