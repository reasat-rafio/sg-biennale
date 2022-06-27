import { EventDetailProps } from "@lib/@types/event.types";
import useGlobalStore from "@stores/global-store";
import { EventDescription } from "./event-description";
import { ImageCarousel } from "./image-carousel";

export const EventDetail: React.FC<EventDetailProps> = ({
  title,
  description,
  date,
  price,
  location,
  time,
  moreInfo,
  category,
  images,
}) => {
  const { footerHeight, navbarHeight } = useGlobalStore();
  const totalAdditionalHeight = footerHeight + navbarHeight;

  return (
    <div
      className="grid grid-cols-12"
      style={{ height: `calc(100vh - ${totalAdditionalHeight}px)` }}
    >
      <EventDescription
        className="col-span-4"
        title={title}
        description={description}
        date={date}
        price={price}
        location={location}
        time={time}
        moreInfo={moreInfo}
        category={category}
      />
      <ImageCarousel className="col-span-8" images={images} />
    </div>
  );
};
