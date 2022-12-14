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
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWidth = useMemo(() => windowWidth / 4, [windowWidth]);
  const sectionMargin = 17;
  const spaceBetween = 40;

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
    if (swiperRef !== null && !!activeCard) {
      swiperRef.current?.slideTo(activeCard as number);
    }
  }, [swiperRef, cardsWidth, activeCard]);

  return (
    <section
      style={{ margin: `0px ${sectionMargin}px` }}
      ref={sectionRef}
      className="bg-yellow-200 mx-5 highlightCarousel"
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
                "relative aspect-square | transition-all duration-700 ease-in-out h-[600px] hover:cursor-pointer"
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
