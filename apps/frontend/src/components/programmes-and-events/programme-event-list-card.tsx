import { Calender } from "@components/icons/calender";
import { Clock } from "@components/icons/clock";
import { Location } from "@components/icons/location";
import { IPgrammeEvents } from "@lib/@types/programmes-events-types";
import clsx from "clsx";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { convertDate, convertSecondsToAMPM } from "@lib/helpers/global.helpers";
import { motion, MotionValue, transform, useMotionValue } from "framer-motion";
import { MouseEvent, useState } from "react";
import { useTransformSpring } from "@lib/helpers/animation.helpers";
import { usePortableTextTruncate } from "@lib/hooks";

interface ProgrammeEventListCardProps extends IPgrammeEvents {
  index: number;
  imgPositionIngAlgo: number[];
}

const styles = {
  smCard: "col-span-12 lg:col-span-4",
  lgCard: "col-span-12 lg:col-span-6",
};

const physics = {
  damping: 30,
  stiffness: 60,
  bounce: 0.1,
  mass: 10,
};
export const ProgrammeEventListCard: React.FC<ProgrammeEventListCardProps> = ({
  images,
  price,
  title,
  slug,
  index,
  description,
  imgPositionIngAlgo,
}) => {
  const [hovered, setHovered] = useState(false);
  const screenX = useMotionValue(0);
  const screenY = useMotionValue(0);
  const x = useTransformSpring({
    value: screenX,
    outputRange: hovered ? [-10, 60] : [0, 0],
    physics,
  });
  const y = useTransformSpring({
    value: screenY,
    outputRange: hovered ? [-40, 40] : [0, 0],
    physics,
  });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const width = transform([0, window.innerWidth], [0, 1])(event.clientX);
    const height = transform([0, window.innerHeight], [0, 1])(event.clientY);
    screenX.set(width);
    screenY.set(height);
  };

  return (
    <motion.article
      style={{ y: 50 * index }}
      className={clsx(
        "",
        imgPositionIngAlgo[index] === 0
          ? index % 2
            ? `${styles.smCard} lg:col-start-8 `
            : styles.smCard
          : index % 2
          ? `${styles.lgCard} lg:col-start-6`
          : styles.lgCard
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setHovered(false);
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="relative flex justify-center items-center">
        <div>
          <figure className="h-[370px]">
            <SanityImg
              className="h-full w-full object-cover"
              builder={imageUrlBuilder}
              image={images[0]}
              alt=""
              width={600}
            />
          </figure>
          <section>
            <h6 className="font-medium text-heading-6">{title}</h6>

            <button className=" font-medium lg:text-[18px] text-base leading-[-0.02em] text-black bg-transparent underline">
              Book Now
            </button>
          </section>
        </div>

        <FLoatingDescription
          x={x}
          y={y}
          hovered={hovered}
          description={description}
        />
      </div>
    </motion.article>
  );
};

const FLoatingDescription: React.FC<{
  description: any;
  hovered: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
}> = ({ description, hovered, x, y }) => {
  const [descriptionRef] = usePortableTextTruncate({ maxLength: 300 });

  return (
    <motion.div
      ref={descriptionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: hovered ? 1 : 0 }}
      style={{ x, y }}
      transition={{ duration: 0.5, type: "tween", ease: "easeInOut" }}
      className="absolute -left-[15%] | w-11/12 | p-5 bg-[#F8F8F8] | text-gray--700 font-manrope text-body-2 leading-[150%] rounded"
    >
      <PortableText blocks={description} />
    </motion.div>
  );
};
