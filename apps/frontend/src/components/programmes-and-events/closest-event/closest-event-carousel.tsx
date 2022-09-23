import { IPgrammeEvents } from "@lib/@types/programmes-events-types";
import { useWindowSize } from "@lib/hooks";
import { motion, Point } from "framer-motion";
import { useEffect, useState } from "react";
import { Backside } from "./backside";
import { FrontSide } from "./front-side";

interface ClosestEventCarouselProps {
  closestEventArr: IPgrammeEvents[];
}
const swipeConfidenceThreshold = 1500;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const gap = 3;

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

export const ClosestEventCarousel: React.FC<ClosestEventCarouselProps> = ({
  closestEventArr,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const [position, setPosition] = useState(1);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [disableSwipingRight, setDisableSwipingRight] =
    useState<boolean>(false);
  const [disableSwipingLeft, setDisableSwipingLeft] = useState<boolean>(false);
  const [cardsPerView, setCardsperView] = useState(3);

  useEffect(() => {
    if (windowWidth >= 1024) setCardsperView(3);
    else if (windowWidth < 1024 && windowWidth >= 768) setCardsperView(2);
    else setCardsperView(1);
  }, [windowWidth]);

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
  };

  return (
    <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
      {closestEventArr.map(
        ({ _id, images, title, description, slug, startAt, venue }, index) => {
          const firstIndex = index === 0;
          const lastIndex = index === closestEventArr.length - 1;
          const fullWidth = (1 / cardsPerView) * 2 * 100;
          const halfWidth = (1 / cardsPerView) * 100;
          const oneCardPerView = cardsPerView === 1;
          const cardWidth = oneCardPerView
            ? `${halfWidth}%`
            : index === activeCardIndex
            ? `${fullWidth}%`
            : `${halfWidth}%`;

          const initialPosition =
            (index + 1 - position) *
            ((1 / (cardsPerView - 1)) * 50 + gap / cardsPerView);
          const positionLeft = oneCardPerView
            ? initialPosition
            : activeCardIndex !== null && activeCardIndex < index
            ? initialPosition + (1 / (cardsPerView + 1)) * 100
            : initialPosition;

          useEffect(() => {
            if (firstIndex && positionLeft >= 100 / cardsPerView)
              setDisableSwipingRight(true);
            else if (firstIndex && positionLeft < 100 / cardsPerView)
              setDisableSwipingRight(false);
            if (lastIndex && positionLeft <= 10) setDisableSwipingLeft(true);
            else if (lastIndex && positionLeft > 10)
              setDisableSwipingLeft(false);
          }, [positionLeft, windowWidth]);

          return (
            <motion.article
              key={_id}
              className="flex flex-col overflow-hidden absolute top-0 h-[500px] "
              initial={{ scale: 0.6 }}
              animate={{
                left: `${positionLeft}vw`,
                width: cardWidth,
              }}
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
                title={title}
                images={images}
                active={activeCardIndex === index}
                cardsPerView={cardsPerView}
              />
              <Backside
                description={description}
                slug={slug}
                venue={venue}
                startAt={startAt}
                active={activeCardIndex === index}
                cardsPerView={cardsPerView}
              />
            </motion.article>
          );
        }
      )}
    </section>
  );
};
