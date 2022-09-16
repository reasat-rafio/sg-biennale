import { TeamCollection } from "@lib/@types/about.types";
import { useWindowSize } from "@lib/hooks";
import { motion } from "framer-motion";
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

  useEffect(() => {
    if (windowWidth >= 1280) setCardsperView(4);
    else if (windowWidth < 1280 && windowWidth >= 1024) setCardsperView(3);
    else if (windowWidth < 1024 && windowWidth >= 768) setCardsperView(2);
    else setCardsperView(1);
  }, [windowWidth]);

  const paginate = (newDirection: number) => {
    setPosition(position + newDirection);
  };

  return (
    <section className="relative h-[70vh] flex flex-col items-center justify-center">
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

          const initialPosition =
            (index + 1 - position) * ((1 / cardsPerView) * 100);
          const animationPosition =
            activeCardIndex !== null && activeCardIndex < index
              ? initialPosition + (1 / cardsPerView) * 100
              : initialPosition * 1;

          useEffect(() => {
            if (firstIndex && animationPosition >= 70)
              setDisableSwipingRight(true);
            else if (firstIndex && animationPosition < 70)
              setDisableSwipingRight(false);
            if (lastIndex && animationPosition <= 10)
              setDisableSwipingLeft(true);
            else if (lastIndex && animationPosition > 10)
              setDisableSwipingLeft(false);
          }, [animationPosition, windowWidth]);

          return (
            <motion.div
              key={_key}
              className="flex flex-col overflow-hidden absolute top-0 h-[500px] px-5"
              initial={{
                left: `${initialPosition * 2}vw`,
              }}
              animate={{
                left: `${animationPosition}vw`,
                scale: 0.9,
                width:
                  index === activeCardIndex
                    ? `${(1 / cardsPerView) * 2 * 100}%`
                    : `${(1 / cardsPerView) * 100}%`,
              }}
              transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onClick={() =>
                setActiveCardIndex((prev) => (prev === index ? null : index))
              }
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold && !disableSwipingLeft) {
                  paginate(1);
                } else if (
                  swipe > swipeConfidenceThreshold &&
                  !disableSwipingRight
                ) {
                  paginate(-1);
                }
              }}
            >
              <FrontSide
                key={_key}
                name={name}
                image={images[0]}
                cardBackgroundGardiants={cardBackgroundGardiants}
                active={activeCardIndex === index}
              />
              <BackSide
                description={description}
                slug={slug}
                active={activeCardIndex === index}
              />
            </motion.div>
          );
        }
      )}
    </section>
  );
};
