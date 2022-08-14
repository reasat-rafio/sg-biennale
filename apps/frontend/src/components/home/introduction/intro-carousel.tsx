import { useVisibleScrollEffect } from "@lib/hooks";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useState } from "react";
import { SanityImage, SanityImg } from "sanity-react-extra";

const flyMove = 1800;
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: any, velocity: any) => {
  return Math.abs(offset) * velocity;
};
const imageIndex = (page: number, length: number) => {
  return wrap(0, length, page);
};

const variants = (length: number) => {
  return {
    enter: ({ direction }: any) => {
      return {
        x: direction > 0 ? 3 * 120 - 3 : -flyMove,
        scale: direction > 0 ? 0.8 : 0.9,
      };
    },
    center: ({ i }: any) => ({
      zIndex: length - i,
      x: i * 120 - i * Math.pow(3, 2),
      scale: 1 - 0.1 * i,
    }),
    exit: ({ direction, i }: any) => {
      return {
        zIndex: length - i,
        x: direction < 0 ? 3 * 120 - 3 * Math.pow(2, 2) : -flyMove,
        scale: direction < 0 ? 1 - 0.3 : 1,
        opacity: direction < 0 ? 0 : 1,
      };
    },
  };
};

export interface IntroCarouselProps {
  _key: string;
  _type: string;
  image: SanityImage;
  title?: string;
  video?: any;
}

export const IntroCarousel: React.FC<{ collection: IntroCarouselProps[] }> = ({
  collection,
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [disableDragging, setDisableDragging] = useState(false);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // useVisibleScrollEffect(
  //   cardRef,
  //   (offsetBoundingRect, _, y) =>
  //     animationFrameEffect(() => {
  //       const yDelta = y + windowHeight - offsetBoundingRect.top;
  //       const ratio = Math.max(0, Math.min(yDelta / windowHeight)) * 1500;
  //       scrollY.set(ratio);
  //     }),
  //   [windowHeight]
  // );

  return (
    <div className="relative overflow-hidden h-[700px] ">
      <AnimatePresence initial={false} custom={{ direction, page }}>
        {Array.from({ length: 3 }, (_, idx) => idx).map((index) => (
          <motion.div
            className="absolute w-full h-full  flex items-center justify-center p-10"
            key={page + index}
            layout
            drag={disableDragging ? false : index === 0 && "x"}
            dragConstraints={{ right: 0, top: 0, left: 0, bottom: 0 }}
            dragElastic={0.5}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 15 }}
            custom={{ direction, i: index, page }}
            variants={variants(collection.length)}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "tween",
                duration: 0.65,
              },
              scale: {
                type: "spring",
                elapsed: 0.1,
              },
              zIndex: { delay: direction > 0 ? 0.65 : 0 },
            }}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold || offset.x < -720) {
                paginate(1);
                setDisableDragging(true);
                setTimeout(() => setDisableDragging(false), 500);
              } else if (swipe > swipeConfidenceThreshold || offset.x > 720)
                paginate(-1);
              setDisableDragging(true);
              setTimeout(() => setDisableDragging(false), 500);
            }}
          >
            <motion.div className="overflow-hidden w-[95%] h-full">
              <SanityImg
                className={clsx(
                  "w-full h-full object-cover pointer-events-none object-center overflow-hidden"
                )}
                draggable={false}
                builder={imageUrlBuilder}
                width={900}
                loading="eager"
                image={
                  collection[imageIndex(page + index, collection.length)].image
                }
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
