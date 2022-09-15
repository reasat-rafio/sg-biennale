import { TeamCollection } from "@lib/@types/about.types";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { SanityImg } from "sanity-react-extra";

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
  console.log(activeCardIndex);

  const paginate = (newDirection: number) => {
    setPosition(position + newDirection);
  };

  return (
    <section className="relative h-[70vh]  flex  flex-col items-center justify-center">
      {teamCollection.map(
        (
          {
            _key,
            cardBackgroundGardiants: { from, to },
            team: { name, images, slug, description },
          },
          index
        ) => {
          const initialPosition = (index + 1 - position) * 20;
          const animationPosition =
            activeCardIndex !== null && activeCardIndex < index
              ? initialPosition + 20
              : initialPosition * 1;

          return (
            <motion.div
              key={_key}
              className="flex flex-col overflow-hidden absolute top-0 h-[500px]"
              style={{
                left: `${index * 10}vw`,
                background: `linear-gradient(180deg, ${from.hex} 0%, ${to.hex} 100%)`,
              }}
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
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <motion.figure
                className={clsx(
                  "absolute h-[250px] bottom-0 left-1/2 -translate-x-1/2 translate-y-[10%]"
                  //   activeCardIndex === index ? "w-1/2" : "w-full"
                )}
              >
                <SanityImg
                  className={clsx(
                    "pointer-events-none h-full w-full object-contain transition-transform duration-500 ease-in-out",
                    activeCardIndex === index ? "scale-125" : "scale-100"
                  )}
                  image={images[0]}
                  builder={imageUrlBuilder}
                />
              </motion.figure>
              <header>
                <h6 className="absolute top-[20%] w-full | px-5 | text-center text-white text-heading-5 font-medium ">
                  {name}
                </h6>
              </header>
            </motion.div>
          );
        }
      )}
    </section>
  );
};
