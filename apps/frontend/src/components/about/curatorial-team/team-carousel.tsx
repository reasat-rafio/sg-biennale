import dynamic from "next/dynamic";
import { TeamCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import { motion, Point } from "framer-motion";
import { useEffect, useState } from "react";
import { FrontSide } from "./front-side";
import { BackSideProps } from "./back-side";
const BackSide = dynamic<BackSideProps>(
  () => import("./back-side").then((com) => com.BackSide),
  { ssr: false }
);

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

  const fullWidth = (1 / cardsPerView) * 2 * 100;
  const halfWidth = (1 / cardsPerView) * 100;
  const gapInPixel = windowWidth >= 1024 ? 15 : 10;
  const oneCardInView = cardsPerView === 1;

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

  const [temp, setTemp] = useState(false);
  const onClickAction = (index: number) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null);
      if (cardsPerView > 1 && temp) {
        paginate(-1);
        setTemp(false);
      }
    } else {
      if (cardsPerView > 1 && index - position === cardsPerView - 2) {
        paginate(1);
        setTemp(true);
      }
      setActiveCardIndex(index);
    }
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

            if (position === teamCollection.length) setDisableSwipingLeft(true);
            else setDisableSwipingLeft(false);
          }, [positionLeft, windowWidth]);

          return (
            <motion.div
              key={_key}
              className="flex flex-col overflow-hidden absolute top-0 xl:h-[500px] h-[400px]"
              initial={{ scale: 0.4 }}
              animate={{
                left: `calc(${positionLeft}% - ${gapInPixel}px)`,
                width: `${cardWidth}%`,
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
                id={_key}
                image={images[0]}
                cardBackgroundGardiants={cardBackgroundGardiants}
                active={activeCardIndex === index}
                cardsPerView={cardsPerView}
              />
              <BackSide
                description={description}
                slug={slug}
                id={_key}
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
