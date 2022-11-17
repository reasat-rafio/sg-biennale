import { IPgrammeEvents } from "@lib/@types/programmes-events.types";
import clsx from "clsx";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder, PortableText } from "@utils/sanity";
import { motion, MotionValue, transform, useMotionValue } from "framer-motion";
import { MouseEvent, useState } from "react";
import { useTransformSpring } from "@lib/helpers/animation.helpers";
import { usePortableTextTruncate, useWindowSize } from "@lib/hooks";
import { format } from "date-fns";
import { Header } from "@components/ui/header";
import { Button } from "@components/ui/button";
import Link from "next/link";

interface ProgrammeEventListCardProps extends IPgrammeEvents {
  index: number;
}

export const ProgrammeEventListCard: React.FC<ProgrammeEventListCardProps> = ({
  cta,
  images,
  price,
  title,
  slug,
  index,
  startAt,
  venue,
  endAt,
  additionalInfo,
  relatedArtists,
  hideCta,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0;

  const priceVal = `${cta.title} - ${price ? `$${price}` : "Free"}${
    additionalInfo ? "*" : ""
  }`;
  const formattedShortDateTime = format(new Date(startAt), "dd.LL");
  const formattedStartDate = format(new Date(startAt), "dd");
  const formattedEndDate = endAt && format(new Date(endAt), "dd");
  const formattedStartTime = format(new Date(startAt), "hh:mm bbb");
  const formattedEndTime = endAt && format(new Date(endAt), "hh:mm bbb");

  return (
    <motion.article
      layout
      initial={{ y: 50 * index + 100, opacity: 0 }}
      whileInView={{ y: 50 * index, opacity: 1 }}
      transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
      viewport={{ once: true }}
      className={clsx("grid grid-cols-12 col-span-12 | gap-5")}
    >
      <div className="flex flex-col | lg:col-span-1 col-span-12 | md:space-y-3 space-y-1">
        <span className="text-[24px] font-medium lg:text-left text-center">
          {formattedShortDateTime}
        </span>
        <div className="flex flex-col justify-end | mt-auto h-full | space-y-1 | font-manrope lg:text-left text-center text-gray--700">
          {startAt && (
            <div className="flex flex-col">
              <span className="text-[10px]">From</span>
              <span className="text-[14px] font-semibold">
                {formattedStartTime}
              </span>
            </div>
          )}

          {endAt && formattedStartDate === formattedEndDate && (
            <div className="flex flex-col">
              <span className="text-[10px]">To</span>
              <span className="text-[14px] font-semibold">
                {formattedEndTime}
              </span>
            </div>
          )}
        </div>
      </div>
      <section className="lg:col-span-4 col-span-12 relative">
        <figure className="lg:h-[250px] md:h-[400px] h-auto">
          <SanityImg
            className="w-full h-full object-cover"
            builder={imageUrlBuilder}
            image={images[0]}
            width={windowWidth >= 1280 ? 300 : windowWidth >= 768 ? 200 : 160}
            alt={title}
          />
        </figure>
      </section>
      <section className="lg:col-span-7 col-span-12 relative | flex flex-col justify-between | font-manrope">
        <div className="flex flex-col space-y-5">
          <h6>
            <Link href={`/programmes-events/${slug.current}`} prefetch={false}>
              <a className="cursor-pointer | hover:text-red-love | transition-colors duration-500 p-1 | xl:text-heading-6 text-[24px] py-1 font-medium">
                {title}
              </a>
            </Link>
          </h6>

          <div className="flex flex-col space-y-2">
            <div className="flex space-x-10 | text-body-2">
              <span className="font-semibold">Artist</span>
              <ul className="flex space-x-1 flex-wrap | text-gray--700">
                {relatedArtists.map(({ _id, name }, index) => (
                  <li key={_id}>
                    {name}
                    {index !== relatedArtists.length - 1
                      ? index !== relatedArtists.length - 2
                        ? ","
                        : " &"
                      : ""}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-10 | text-body-2">
              <span className="font-semibold">Venue</span>

              <ul className="flex space-x-1 | text-gray--700">
                {venue.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {!hideCta && (
          <div className="flex sm:flex-row flex-col sm:items-end | sm:space-x-3 sm:space-y-3 space-y-3 md:mt-0 mt-5">
            <div className="flex-1">
              <Button href={cta?.href} type="href" variant="secondary">
                {priceVal}
              </Button>
            </div>
            {additionalInfo && (
              <span className="text-body-2 text-gray--700">
                *{additionalInfo}
              </span>
            )}
          </div>
        )}
      </section>
    </motion.article>
  );
};
