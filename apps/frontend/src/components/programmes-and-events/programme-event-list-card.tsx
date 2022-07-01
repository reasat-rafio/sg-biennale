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
import Link from "next/link";

interface ProgrammeEventListCardProps {
  data: IPgrammeEvents;
  className?: string;
}

export const ProgrammeEventListCard: React.FC<ProgrammeEventListCardProps> = ({
  data: { category, date, images, location, price, title, time, slug },
  className,
}) => {
  const timeLocationAndDate = [
    { icon: <Location className="h-4 w-4" />, title: location },
    { icon: <Calender className="h-4 w-4" />, title: date },
    { icon: <Clock className="h-4 w-4" />, title: time },
  ];
  return (
    <div className={clsx("h-[450px] border-t-2 border-black pt-4", className)}>
      <div className="h-1/2 mb-2">
        <Swiper
          className="h-full"
          modules={[Pagination, EffectFade, Autoplay]}
          slidesPerView={1}
          effect="fade"
          autoplay
          pagination={{ clickable: true }}
          //   onSlideChange={() => console.log("slide change")}
          //   onSwiper={(swiper) => console.log(swiper)}
        >
          {images.map((img) => (
            <SwiperSlide key={img.asset}>
              <SanityImg builder={imageUrlBuilder} image={img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="">
          <div className="flex space-x-2">
            <span className="flex-1">
              {category.map(({ id, name }) => (
                <span className="text-sm font-medium" key={id}>
                  {name}{" "}
                </span>
              ))}
            </span>
            <span className="text-2xl font-medium">S${price}</span>
          </div>
          <h6 className="text-2xl font-medium">{title}</h6>
        </div>
        <div>
          {timeLocationAndDate.map(({ icon, title }) => (
            <div className="flex space-x-2 items-center text-lg" key={title}>
              {icon}
              <span>{title}</span>
            </div>
          ))}
        </div>
        <div>
          <button className="px-4 py-1 bg-black text-white rounded-3xl">
            <Link href={`/programmes-event/${slug.current}`}>
              <a>Book</a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
