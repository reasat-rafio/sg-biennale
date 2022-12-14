import dynamic from "next/dynamic";
import { TeamCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FrontSide } from "./front-side";
import { BackSideProps } from "./back-side";
import clsx from "clsx";
import { Swiper as SwiperType, Mousewheel, Scrollbar } from "swiper";

const BackSide = dynamic<BackSideProps>(
  () => import("./back-side").then((com) => com.BackSide),
  { ssr: false }
);

interface TeamCarouselProps {
  teamCollection: TeamCollection[];
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  teamCollection,
}) => {
  const swiperRef = useRef<SwiperType>();
  const windowWidth = useWindowSize()?.width ?? 0;
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [cardsPerView, setCardsperView] = useState(4);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWidth = useMemo(
    () => windowWidth / cardsPerView,
    [cardsPerView, windowWidth]
  );
  const sectionMargin = 17;
  const spaceBetween = useMemo(
    () => (cardsPerView > 2 ? 40 : 30),
    [cardsPerView]
  );

  const onClickCardAction = (index: number) =>
    setActiveCard((prev) => (prev === index ? null : index));

  const getWidth = useCallback(
    (index: number) =>
      index === activeCard
        ? cardsWidth * 2 - (spaceBetween + sectionMargin / 2)
        : cardsWidth - (spaceBetween + sectionMargin / 2),
    [activeCard, cardsWidth]
  );

  useEffect(() => {
    if (windowWidth >= 1280) setCardsperView(4);
    else if (windowWidth < 1280 && windowWidth >= 1024) setCardsperView(3);
    else if (windowWidth < 1024 && windowWidth >= 768) setCardsperView(2);
    else setCardsperView(1);
  }, [windowWidth]);

  useEffect(() => {
    if (swiperRef !== null && !!activeCard) {
      const slideTo = cardsPerView > 2 ? activeCard - 1 : activeCard;
      swiperRef.current?.slideTo(slideTo);
    }
  }, [swiperRef, cardsWidth, activeCard, cardsPerView]);

  useEffect(() => {
    swiperRef.current?.update();
  }, [cardsPerView]);

  return (
    <section
      style={{ margin: `0px ${sectionMargin}px` }}
      ref={sectionRef}
      className="mx-5"
    >
      <Swiper
        grabCursor
        speed={600}
        slidesPerView="auto"
        spaceBetween={spaceBetween}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          swiper.update();
        }}
        onInit={(swiper) => {
          setTimeout(() => swiper.update(), 500);
        }}
      >
        {teamCollection.map(
          ({ _key, cardBackgroundGardiants, team }, index) => (
            <SwiperSlide
              key={_key}
              onClick={() => onClickCardAction(index)}
              style={{
                width: getWidth(index),
              }}
              className={clsx(
                "relative aspect-square | transition-all duration-700 ease-in-out | xl:h-[500px] h-[400px] | hover:cursor-pointer"
              )}
            >
              <FrontSide
                _key={_key}
                name={team.name}
                active={index === activeCard}
                bgGradient={cardBackgroundGardiants}
                width={cardsWidth - spaceBetween + sectionMargin / 2}
                image={team.images[0]}
                windowWidth={windowWidth}
              />
              <BackSide
                _key={_key}
                width={cardsWidth - (spaceBetween + sectionMargin / 2)}
                active={index === activeCard}
                description={team.description}
                slug={team.slug}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </section>
  );
};
