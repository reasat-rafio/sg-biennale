import { TeamCollection } from "@lib/@types/about.types";
import { motion } from "framer-motion";
import { useState } from "react";
import { BackSide } from "./back-side";
import { FrontSide } from "./front-side";

interface TeamCarouselProps {
  teamCollection: TeamCollection[];
}

const swipeConfidenceThreshold = 2500;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  teamCollection,
}) => {
  const [position, setPosition] = useState(1);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

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
          const initialPosition = (index + 1 - position) * 25;
          const animationPosition =
            activeCardIndex !== null && activeCardIndex < index
              ? initialPosition + 20
              : initialPosition * 1;

          return (
            <motion.div
              key={_key}
              className="flex flex-col overflow-hidden absolute top-0 h-[500px] px-5"
              animate={{
                left: `${animationPosition}vw`,
                scale: index === position ? 1 : 0.9,
                width: index === activeCardIndex ? "50%" : "25%",
              }}
              transition={{ type: "tween", ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onClick={() =>
                setActiveCardIndex((prev) => (prev === index ? null : index))
              }
              onDragEnd={(e, { offset, velocity, delta, point }) => {
                const swipe = swipePower(offset.x, velocity.x);
                console.log(point.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
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
