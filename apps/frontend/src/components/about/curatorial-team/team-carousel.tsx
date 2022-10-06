import { TeamCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import { motion, Point } from "framer-motion";
import { useEffect, useState } from "react";
import { BackSide } from "./back-side";
import { FrontSide } from "./front-side";

interface TeamCarouselProps {
  teamCollection: TeamCollection[];
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

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  teamCollection,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;
  const [position, setPosition] = useState(1);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [disableSwipingRight, setDisableSwipingRight] =
    useState<boolean>(false);
  const [disableSwipingLeft, setDisableSwipingLeft] = useState<boolean>(false);
  const [cardsPerView, setCardsperView] = useState(4);
  const gapInPixel = windowWidth >= 1024 ? 15 : 10;

  useEffect(() => {
    if (windowWidth >= 1280) setCardsperView(4);
    else if (windowWidth < 1280 && windowWidth >= 1024) setCardsperView(3);
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
    <section className="relative xl:h-[700px] h-[450px] flex flex-col items-center justify-center">
      {teamCollection.map(
        (
          {
            _key,
            cardBackgroundGardiants,
            team: { name, images, slug, description },
          },
          index
        ) => {
          const firstIndex = index === 0;
          const lastIndex = index === teamCollection.length - 1;
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
            ((1 / (Math.max(cardsPerView, 2) - 1)) *
              ((100 / cardsPerView) * (Math.max(cardsPerView, 2) - 1)));

          const positionLeft = oneCardPerView
            ? initialPosition
            : activeCardIndex !== null && activeCardIndex < index
            ? initialPosition + (1 / cardsPerView) * 100
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
            <motion.div
              key={_key}
              className="flex flex-col overflow-hidden absolute top-0 xl:h-[500px] h-[400px]"
              initial={{ scale: 0.4 }}
              animate={{
                left: `calc(${positionLeft}% - ${gapInPixel}px)`,
                width: cardWidth,
              }}
              style={{ padding: `0 ${gapInPixel}px` }}
              whileInView={{ scale: 0.9 }}
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
                key={_key}
                name={name}
                image={images[0]}
                cardBackgroundGardiants={cardBackgroundGardiants}
                active={activeCardIndex === index}
                cardsPerView={cardsPerView}
              />
              <BackSide
                description={description}
                slug={slug}
                active={activeCardIndex === index}
                cardsPerView={cardsPerView}
              />
            </motion.div>
          );
        }
      )}
    </section>
  );
};
