import { IntroCarouselProps } from "@lib/@types/home.types";
import { CardVariants } from "@lib/animations/swipable-stack-card";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useState } from "react";
import { Image } from "./image";
import { Video } from "./video";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: any, velocity: any) => {
  return Math.abs(offset) * velocity;
};
const imageIndex = (page: number, length: number) => {
  return wrap(0, length, page);
};

export const IntroCarousel: React.FC<{ collection: IntroCarouselProps[] }> = ({
  collection,
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [disableDragging, setDisableDragging] = useState(false);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative max-h-[700px] w-full | overflow-hidden aspect-video">
      <AnimatePresence initial={false} custom={{ direction, page }}>
        {Array.from({ length: 3 }, (_, idx) => idx).map((index) => {
          const image =
            collection[imageIndex(page + index, collection.length)]?.image;
          const video =
            collection[imageIndex(page + index, collection.length)]?.video;

          return (
            <motion.div
              className="absolute w-full h-full | flex items-center justify-center xl:p-10 p-5"
              key={page + index}
              layout
              drag={disableDragging ? false : index === 0 && "x"}
              dragConstraints={{ right: 0, top: 0, left: 0, bottom: 0 }}
              dragElastic={0.5}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 15 }}
              custom={{ direction, i: index, page }}
              variants={CardVariants(collection.length)}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: "tween",
                  duration: 0.85,
                },
                scale: {
                  type: "spring",
                  elapsed: 0.1,
                },
                zIndex: { delay: direction > 0 ? 0.85 : 0 },
              }}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold || offset.x < -720) {
                  paginate(1);
                  setDisableDragging(true);
                  setTimeout(() => setDisableDragging(false), 650);
                } else if (swipe > swipeConfidenceThreshold || offset.x > 720)
                  paginate(-1);
                setDisableDragging(true);
                setTimeout(() => setDisableDragging(false), 650);
              }}
            >
              <motion.div className="overflow-hidden w-[95%] h-full">
                {video ? (
                  <Video page={page} video={video} />
                ) : (
                  <Image image={image} />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
