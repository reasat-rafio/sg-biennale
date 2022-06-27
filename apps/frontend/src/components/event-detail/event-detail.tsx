import { EventDetailProps } from "@lib/@types/event.types";
import { EventDescription } from "./event-description";
import { ImageCarousel } from "./image-carousel";

export const EventDetail: React.FC<EventDetailProps> = ({}) => {
  return (
    <div>
      <EventDescription />
      <ImageCarousel />
    </div>
  );
};
