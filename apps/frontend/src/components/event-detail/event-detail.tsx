import { EventDetailProps } from "@lib/@types/event.types";
import { useWindowSize } from "@lib/hooks";
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
  const windowHeight = useWindowSize()?.width ?? 0;

  return (
    <div
      className="grid grid-cols-12"
      style={{
        height:
          windowHeight >= 768
            ? `calc(100vh - ${totalAdditionalHeight}px)`
            : `100%`,
      }}
    >
      <EventDescription
        className="xl:col-span-4 md:col-span-5 col-span-12"
        title={title}
        description={description}
        date={date}
        price={price}
        location={location}
        time={time}
        moreInfo={moreInfo}
        category={category}
      />
      <ImageCarousel
        className="xl:col-span-8 md:col-span-7 col-span-12"
        images={images}
      />
    </div>
  );
};
