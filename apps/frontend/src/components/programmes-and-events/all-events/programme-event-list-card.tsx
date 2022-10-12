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
import { useRouter } from "next/router";

interface ProgrammeEventListCardProps extends IPgrammeEvents {
  index: number;
}

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
  startAt,
  venue,
  relatedArtists,
}) => {
  const router = useRouter();
  const windowWidth = useWindowSize()?.width ?? 0;
  const [hovered, setHovered] = useState(false);
  const screenX = useMotionValue(0);
  const screenY = useMotionValue(0);

  const priceVal = `Book Now - ${price ? `$${price}` : "Free"}`;
  const formattedShortDate = format(new Date(startAt), "dd.LL");
  const formattedDate = format(
    new Date(startAt),
    "eee, d LLL yyyy - hh:mm aaaaa'm'"
  );

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

  const onHeaderClickAction = () => {
    router.push(`/programmes-events/${slug.current}`);
  };
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
      className={clsx("grid grid-cols-12 col-span-12 | gap-5")}
      onMouseMove={handleMouseMove}
    >
      <div className="lg:col-span-1 col-span-12 | text-center text-2xl font-medium">
        {formattedShortDate}
      </div>
      <section className="lg:col-span-4 col-span-12 relative">
        <figure className="lg:h-[250px] md:h-[400px] h-auto">
          <SanityImg
            className="w-full h-full object-cover"
            builder={imageUrlBuilder}
            image={images[0]}
            height={300}
          />
        </figure>
        {windowWidth >= 1024 && (
          <FLoatingDescription
            x={x}
            y={y}
            hovered={hovered}
            description={description}
          />
        )}
      </section>
      <section
        className="lg:col-span-7 col-span-12 relative | flex flex-col justify-between | font-manrope"
        onMouseEnter={onMouseEnterAction}
        onMouseLeave={onMouseLeaveAction}
      >
        <div className="flex flex-col space-y-5">
          <Header
            type="h6"
            className="cursor-pointer | hover:text-red-love | transition-colors duration-500 p-1"
            variant="secondary"
            onClick={onHeaderClickAction}
          >
            {title}
          </Header>
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

        <div className="flex md:flex-row flex-col | md:items-center | md:mt-0 mt-5 md:space-y-0 space-y-5">
          <div className="flex-1 flex | space-x-10 | text-body-2">
            <span className="font-semibold">Date & Time</span>
            <span className="text-gray--700">{formattedDate}</span>
          </div>
          <Button className="md:w-auto w-full" variant="secondary">
            {priceVal}
          </Button>
        </div>
      </section>
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
      className="absolute -left-[15%] top-1/2 | w-11/12 | p-5 bg-[#F8F8F8] | text-gray--700 font-manrope text-body-2 leading-[150%] rounded"
    >
      <PortableText blocks={description} />
    </motion.div>
  );
};
