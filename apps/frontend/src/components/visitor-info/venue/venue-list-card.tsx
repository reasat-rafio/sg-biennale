import clsx from "clsx";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { motion } from "framer-motion";
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
  const [descriptionRef] = usePortableTextTruncate({ maxLength: 300 });

  const containerStylings =
    imgPositionIngAlgo[index] === 0
      ? index % 2
        ? `${styles.smCard} xl:col-start-9 lg:col-start-8`
        : styles.smCard
      : index % 2
      ? `${styles.lgCard} lg:col-start-7`
      : styles.lgCard;

  return (
    <motion.article
      layout
      initial={{ y: 50 * index + 100, opacity: 0 }}
      whileInView={{ y: 50 * index, opacity: 1 }}
      transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
      viewport={{ once: true }}
      className={clsx(containerStylings)}
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
            <Link href={`/venue/${slug.current}`} prefetch={false}>
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
                  <span>{startAt}</span>
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
      </div>
    </motion.article>
  );
};
