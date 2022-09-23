import { Clock } from "@components/icons/clock";
import { Button } from "@components/ui/button";
import { IPgrammeEvents } from "@lib/@types/programmes-events-types";
import { usePortableTextTruncate } from "@lib/hooks";
import { PortableText } from "@utils/sanity";
import { motion, Variants } from "framer-motion";
import { format } from "date-fns";

interface BacksideProps {
  description: IPgrammeEvents["description"];
  slug: IPgrammeEvents["slug"];
  venue: IPgrammeEvents["venue"];
  startAt: IPgrammeEvents["startAt"];
  cardsPerView: number;
  active: boolean;
  ref?: (node: HTMLElement | null) => void;
}

const SlideRightAnimationVariants: Variants = {
  initial: {
    translateX: 0,
    opacity: 0,
  },
  animate: {
    translateX: ["0%", "100%"],
    opacity: 1,
  },
};

export const Backside: React.FC<BacksideProps> = (props) => {
  const [ref] = usePortableTextTruncate({ maxLength: 200 });
  return (
    <>
      {props.cardsPerView !== 1 ? (
        <SlideRight ref={ref} {...props} />
      ) : (
        <ScaleUp ref={ref} {...props} />
      )}
    </>
  );
};

const SlideRight: React.FC<BacksideProps> = ({
  active,
  description,
  ref,
  venue,
  startAt,
}) => {
  const formattedDate = format(
    new Date(startAt),
    "eee, d LLL yyyy - hh:mm aaaaa'm'"
  );

  return (
    <motion.div
      className="absolute z-10 h-full w-1/2 | flex flex-col justify-center items-center | p-8 box-border ml-auto | bg-[#F8F8F8]"
      initial="initial"
      onClick={(e) => e.stopPropagation()}
      animate={active ? "animate" : "initial"}
      transition={{
        type: "spring",
        duration: 0.5,
      }}
      variants={SlideRightAnimationVariants}
    >
      <div className="flex-1 flex ">
        <span className="text-body-2 font-manrope text-gray--700" ref={ref}>
          <PortableText blocks={description} />
        </span>
      </div>
      <div className="w-full space-y-10">
        <div className="space-y-3">
          <span className="flex items-center space-x-2">
            <img
              className="h-[18px]"
              src="/icons/location.svg"
              alt="location-icon"
            />
            <span className="font-manrope text-gray--700 text-body-2">
              {venue[0].name}
            </span>
          </span>
          <span className="flex items-center space-x-2">
            <Clock className="h-[18px]" />
            <span className="font-manrope text-gray--700 text-body-2">
              <span>{formattedDate}</span>
            </span>
          </span>
        </div>

        <Button className="w-full">Book Now</Button>
      </div>
    </motion.div>
  );
};

const ScaleUp: React.FC<BacksideProps> = ({ active, description, ref }) => {
  return (
    <motion.div
      className={
        "absolute top-0 left-0 h-full w-full z-20 bg-black bg-opacity-80"
      }
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 100,
      }}
      transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-[80%] mx-auto flex justify-center items-center flex-col h-full space-y-5">
        <span
          className="font-mono text-body-1 text-white text-center"
          ref={ref}
        >
          <PortableText blocks={description} />
        </span>
        <Button className="!bg-white !text-black">View Artist</Button>
      </div>
    </motion.div>
  );
};
