import { Backside } from "@components/programmes-and-events/closest-event/backside";
import { FrontSide } from "@components/programmes-and-events/closest-event/font-side";
import { RelatedEventsProps } from "@lib/@types/artist-details.types";
import { useWindowSize } from "@lib/hooks";
import { motion, Point } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ProgrammesEventsCarouselProps {
  relatedEvents: RelatedEventsProps[];
}
const swipeConfidenceThreshold = 1500;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const transition = (index: number) => ({
  left: {
    type: "tween",
    duration: 0.6,
    ease: "easeInOut",
  },
  scale: {
    delay: index * 0.2,
    type: "tween",
    duration: 0.5,
    ease: "easeInOut",
  },
});

export const ProgrammesEventsCarousel: React.FC<
  ProgrammesEventsCarouselProps
> = ({ relatedEvents }) => {
  const carouselRef = useRef<HTMLElement | null>(null);
  const windowWidth = useWindowSize()?.width ?? 0;
  const [position, setPosition] = useState(1);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [disableSwipingRight, setDisableSwipingRight] =
    useState<boolean>(false);
  const [disableSwipingLeft, setDisableSwipingLeft] = useState<boolean>(false);
  const [cardsPerView, setCardsperView] = useState(3);

  const fullWidth = (1 / cardsPerView) * 2 * 100;
  const halfWidth = (1 / cardsPerView) * 100;
  const oneCardInView = cardsPerView === 1;
  const gapInPixel = windowWidth >= 1024 ? 25 : windowWidth >= 720 ? 15 : 0;

  useEffect(() => {
    if (windowWidth >= 1280) setCardsperView(3);
    else if (windowWidth < 1280 && windowWidth >= 1024) setCardsperView(2.5);
    else if (windowWidth < 1024 && windowWidth >= 768) setCardsperView(2);
    else setCardsperView(1);
  }, [windowWidth, setCardsperView]);

  const paginate = (newDirection: number) => {
    setPosition(position + newDirection);
  };

  const onDragAction = (offset: Point, velocity: Point) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold && !disableSwipingLeft) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold && !disableSwipingRight) {
      paginate(-1);
    }
  };

  const onClickAction = (index: number) => {
    setActiveCardIndex((prev) => (prev === index ? null : index));
    const positionsToCheck = cardsPerView > 2 ? [1, 2] : [0, 1, 2];
    const lastPosition = positionsToCheck.some(
      (num) => num === index - position
    );
    if (position <= 0 || (lastPosition && !activeCardIndex)) paginate(1);
    else if (lastPosition && activeCardIndex) paginate(-1);
  };

  return (
    <section
      ref={carouselRef}
      className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden"
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
        ) => {
          const isFirstIndex = index === 0;
          const isLastIndex = index === relatedEvents.length - 1;

          const cardWidth = oneCardInView
            ? halfWidth
            : index === activeCardIndex
            ? fullWidth
            : halfWidth;

          const initialPosition =
            (index + 1 - position) *
            ((1 / (Math.max(cardsPerView, 2) - 1)) *
              ((100 / cardsPerView) * (Math.max(cardsPerView, 2) - 1)));

          const positionLeft = oneCardInView
            ? initialPosition
            : activeCardIndex !== null && activeCardIndex < index
            ? initialPosition + (1 / cardsPerView) * 100
            : initialPosition;

          useEffect(() => {
            if (position === (cardsPerView - 2) * -1)
              setDisableSwipingRight(true);
            else setDisableSwipingRight(false);

            if (position === relatedEvents.length) setDisableSwipingLeft(true);
            else setDisableSwipingLeft(false);
          }, [positionLeft, windowWidth, cardsPerView]);

          return (
            <motion.article
              key={_id}
              className="flex flex-col overflow-hidden absolute top-0 h-[500px]"
              initial={{ scale: 0.6 }}
              animate={{
                left: `calc(${positionLeft}% - ${gapInPixel}px)`,
                width: `${cardWidth}%`,
              }}
              style={{ padding: `0 ${gapInPixel}px` }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={transition(index)}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onClick={() => onClickAction(index)}
              onDragEnd={(_, { offset, velocity }) =>
                onDragAction(offset, velocity)
              }
            >
              <FrontSide
                index={index}
                title={title}
                images={images}
                active={activeCardIndex === index}
                cardsPerView={cardsPerView}
                relatedArtists={relatedArtists}
              />
              <Backside
                description={description}
                slug={slug}
                venue={venue}
                startAt={startAt}
                active={activeCardIndex === index}
                cardsPerView={cardsPerView}
                bookNowUrl={bookNowUrl}
              />
            </motion.article>
          );
        }
      )}
    </section>
  );
};
