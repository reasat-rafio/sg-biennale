import { Accordion } from "@components/common/accordion";
import { EventDescriptionProps } from "@lib/@types/event.types";
import clsx from "clsx";
import {
  Description,
  Header,
  PriceAndCTA,
  TimeLocationAndDate,
} from "./event-description-blocks";

export const EventDescription: React.FC<EventDescriptionProps> = ({
  className,
  category,
  title,
  eventEndTime,
  eventStartDate,
  eventStartTime,
  venue,
  eventEndDate,
  price,
  description,
  moreInfo,
}) => {
  return (
    <div
      className={clsx(
        className,
        "flex flex-col | space-y-7 p-5 | overflow-y-auto"
      )}
    >
      <Header category={category} title={title} />
      <TimeLocationAndDate
        eventEndTime={eventEndTime}
        eventStartDate={eventStartDate}
        eventStartTime={eventStartTime}
        eventEndDate={eventEndDate}
        venue={venue}
      />
      <PriceAndCTA price={price} />
      <Description description={description} />
      {moreInfo?.length && <Accordion moreInfo={moreInfo} />}
    </div>
  );
};
