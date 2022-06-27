import { EventDescriptionProps } from "@lib/@types/event.types";
import clsx from "clsx";
import {
  Accordions,
  Description,
  GoBack,
  Header,
  PriceAndCTA,
  TimeLocationAndDate,
} from "./event-description-blocks";

export const EventDescription: React.FC<EventDescriptionProps> = ({
  className,
  category,
  title,
  location,
  time,
  date,
  price,
  description,
  moreInfo,
}) => {
  return (
    <div
      className={clsx("p-5 flex flex-col space-y-7 overflow-y-auto", className)}
    >
      <GoBack />
      <Header category={category} title={title} />
      <TimeLocationAndDate date={date} location={location} time={time} />
      <PriceAndCTA price={price} />
      <Description description={description} />
      {moreInfo?.length && <Accordions moreInfo={moreInfo} />}
    </div>
  );
};
