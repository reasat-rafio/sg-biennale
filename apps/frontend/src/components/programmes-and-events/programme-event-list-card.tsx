import { Calender } from "@components/icons/calender";
import { Clock } from "@components/icons/clock";
import { Location } from "@components/icons/location";
import { IPgrammeEvents } from "@lib/@types/programmes-events-types";
import clsx from "clsx";
import { Autoplay, EffectFade, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "@utils/sanity";
import { convertDate, convertSecondsToAMPM } from "@lib/helpers/global.helpers";

interface ProgrammeEventListCardProps {
  data: IPgrammeEvents;
  index: number;
  imgPositionIngAlgo: number[];
}

const styles = {
  smCard: "col-span-12 lg:col-span-4",
  lgCard: "col-span-12 lg:col-span-6",
};

export const ProgrammeEventListCard: React.FC<ProgrammeEventListCardProps> = ({
  data: {
    category,
    eventEndDate,
    eventStartDate,
    images,
    // venue,
    price,
    title,
    eventStartTime,
    eventEndTime,
    slug,
  },
  index,
  imgPositionIngAlgo,
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
    <article
      className={
        (clsx(""),
        imgPositionIngAlgo[index] === 0
          ? index % 2
            ? `${styles.smCard} lg:col-start-8 `
            : styles.smCard
          : index % 2
          ? `${styles.lgCard} lg:col-start-6`
          : styles.lgCard)
      }
    >
      <figure className="h-[370px]">
        <SanityImg
          className="h-full w-full object-cover"
          builder={imageUrlBuilder}
          image={images[0]}
          alt=""
          width={600}
        />
      </figure>
      <section></section>
    </article>
  );
};
