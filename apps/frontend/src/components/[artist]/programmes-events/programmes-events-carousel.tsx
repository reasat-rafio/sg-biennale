import "swiper/css";
import "swiper/css/free-mode";
import clsx from "clsx";
import { Backside } from "@components/programmes-and-events/closest-event/backside";
import { FrontSide } from "@components/programmes-and-events/closest-event/font-side";
import { RelatedEventsProps } from "@lib/@types/artist-details.types";
import { useWindowSize } from "@lib/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Swiper as SwiperType, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProgrammesEventsCarouselProps {
  relatedEvents: RelatedEventsProps[];
}

export const ProgrammesEventsCarousel: React.FC<
  ProgrammesEventsCarouselProps
> = ({ relatedEvents }) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const swiperRef = useRef<SwiperType>();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [cardsPerView, setCardsperView] = useState(3);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWidth = useMemo(
    () =>
      sectionRef?.current &&
      sectionRef?.current?.getBoundingClientRect().width / cardsPerView,
    [cardsPerView, windowWidth, sectionRef]
  );
  const spaceBetween = useMemo(
    () => (cardsPerView > 2 ? 40 : 30),
    [cardsPerView]
  );

  const onClickCardAction = (index: number) =>
    setActiveCard((prev) => (prev === index ? null : index));

  const getWidth = useCallback(
    (index: number) =>
      index === activeCard
        ? cardsPerView > 1
          ? cardsWidth! * 2 - spaceBetween / 2
          : cardsWidth! - spaceBetween / 2
        : cardsWidth! - spaceBetween / 2,
    [activeCard, cardsWidth, cardsPerView]
  );

  useEffect(() => {
    if (windowWidth >= 1280) setCardsperView(3);
    else if (windowWidth < 1280 && windowWidth >= 1024) setCardsperView(2.5);
    else if (windowWidth < 1024 && windowWidth >= 768) setCardsperView(2);
    else setCardsperView(1);
  }, [windowWidth, setCardsperView]);

  useEffect(() => {
    if (swiperRef !== null && !!activeCard && cardsPerView !== 0) {
      const slideTo = cardsPerView > 2 ? activeCard - 1 : activeCard;
      swiperRef.current?.slideTo(slideTo);
    }
  }, [swiperRef, cardsWidth, activeCard, cardsPerView]);

  useEffect(() => {
    swiperRef.current?.update();
  }, [cardsPerView]);

  return (
    // <section
    //   ref={carouselRef}
    //   className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden"
    // >
    <section ref={sectionRef} className="mx-5 lg:pb-xxl pb-x">
      <Swiper
        grabCursor
        speed={1000}
        slidesPerView="auto"
        spaceBetween={spaceBetween}
        freeMode={true}
        modules={[FreeMode]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          swiper.update();
        }}
        onInit={(swiper) => {
          setTimeout(() => swiper.update(), 500);
        }}
      >
        {relatedEvents.map(
          (
            {
              _id,
              images,
              title,
              description,
              slug,
              startAt,
              venue,
              bookNowUrl,
              relatedArtists,
            },
            index
          ) => (
            <SwiperSlide
              key={_id}
              onClick={() => onClickCardAction(index)}
              style={{
                width: getWidth(index),
              }}
              className={clsx(
                "relative aspect-square | transition-all duration-700 ease-in-out | xl:h-[500px] h-[400px]"
              )}
            >
              <FrontSide
                index={index}
                title={title}
                images={images}
                relatedArtists={relatedArtists}
                width={cardsWidth! - spaceBetween / 2}
              />
              <Backside
                description={description}
                slug={slug}
                venue={venue}
                active={index === activeCard}
                startAt={startAt}
                width={cardsWidth! - spaceBetween / 2}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </section>
  );
};
