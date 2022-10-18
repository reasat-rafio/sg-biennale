import clsx from "clsx";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { motion, MotionValue, transform, useMotionValue } from "framer-motion";
import { MouseEvent, useState } from "react";
import { useTransformSpring } from "@lib/helpers/animation.helpers";
import { usePortableTextTruncate, useWindowSize } from "@lib/hooks";
import { format } from "date-fns";
import { VenueProps } from "@lib/@types/visitor-info.types";
import { useRouter } from "next/router";
import Link from "next/link";

interface VenueListCardProps extends VenueProps {
  index: number;
  imgPositionIngAlgo: number[];
}

const styles = {
  smCard: "col-span-12 xl:col-span-4 lg:col-span-5",
  lgCard: "col-span-12 lg:col-span-6 ",
};

const physics = {
  damping: 30,
  stiffness: 60,
  bounce: 0.1,
  mass: 10,
};
export const VenueListCard: React.FC<VenueListCardProps> = ({
  images,
  slug,
  name,
  index,
  location,
  description,
  imgPositionIngAlgo,
  startAt,
  direction,
}) => {
  const router = useRouter();
  const windowWidth = useWindowSize()?.width ?? 0;
  const [hovered, setHovered] = useState(false);
  const screenX = useMotionValue(0);
  const screenY = useMotionValue(0);
  const [descriptionRef] = usePortableTextTruncate({ maxLength: 300 });

  const containerStylings =
    imgPositionIngAlgo[index] === 0
      ? index % 2
        ? `${styles.smCard} xl:col-start-9 lg:col-start-8`
        : styles.smCard
      : index % 2
      ? `${styles.lgCard} lg:col-start-7`
      : styles.lgCard;

  const x = useTransformSpring({
    value: screenX,
    outputRange: hovered ? [-10, 60] : [0, 0],
    physics,
  });
  const y = useTransformSpring({
    value: screenY,
    outputRange: hovered ? [-60, 20] : [0, 0],
    physics,
  });

  const onMouseEnterAction = () => setHovered(true);
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const width = transform([0, window.innerWidth], [0, 1])(event.clientX);
    const height = transform([0, window.innerHeight], [0, 1])(event.clientY);
    screenX.set(width);
    screenY.set(height);
  };
  const onMouseLeaveAction = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.article
      layout
      initial={{ y: 50 * index + 100, opacity: 0 }}
      whileInView={{ y: 50 * index, opacity: 1 }}
      transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
      viewport={{ once: true }}
      className={clsx(containerStylings)}
      onMouseEnter={onMouseEnterAction}
      onMouseLeave={onMouseLeaveAction}
      onMouseMove={handleMouseMove}
    >
      <div className="relative flex justify-center items-center">
        <div className="flex flex-col w-full | space-y-5">
          <figure className="md:h-[370px]  w-full">
            {images?.length && (
              <SanityImg
                className="h-full w-full object-cover"
                builder={imageUrlBuilder}
                image={images[0]}
                width={
                  windowWidth >= 1280 ? 500 : windowWidth >= 768 ? 300 : 200
                }
                alt={name}
              />
            )}
          </figure>
          <section className="flex flex-col | space-y-5">
            <Link href={`/venue/${slug.current}`}>
              <a className="font-medium text-heading-6 leading-[125%] | cursor-pointer hover:text-red-love | transition-colors duration-500">
                {name}
              </a>
            </Link>

            <div className="flex flex-col space-y-1">
              <span className="font-manrope text-gray--700 text-body-2">
                {location}
              </span>
              {startAt && (
                <span className="font-manrope text-gray--700 text-body-2">
                  <span>
                    {format(
                      new Date(startAt),
                      "eee, d LLL yyyy - hh:mm aaaaa'm'"
                    )}
                  </span>
                </span>
              )}
            </div>

            {windowWidth < 1024 && description && (
              <div
                ref={descriptionRef}
                className="text-gray--700 font-manrope text-body-2"
              >
                <PortableText blocks={description} />
              </div>
            )}
            {direction && (
              <button
                onClick={() => router.push(direction)}
                className="mr-auto | font-medium lg:text-[18px] text-base leading-[-0.02em] text-black bg-transparent underline"
              >
                Directions
              </button>
            )}
          </section>
        </div>
        {windowWidth >= 1024 && (
          <FLoatingDescription
            x={x}
            y={y}
            hovered={hovered}
            description={description}
          />
        )}
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
