import { Clock } from "@components/icons/clock";
import { IPgrammeEvents } from "@lib/@types/programmes-events.types";
import { usePortableTextTruncate } from "@lib/hooks";
import { PortableText } from "@utils/sanity";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Location } from "@components/icons/location";
import { useRouter } from "next/router";
import { Button } from "@components/ui/button";
import clsx from "clsx";

interface BacksideProps {
  description: IPgrammeEvents["description"];
  slug: IPgrammeEvents["slug"];
  venue: IPgrammeEvents["venue"];
  startAt: IPgrammeEvents["startAt"];
  active: boolean;
  formattedDate?: string;
  bookNowUrl?: string;
  className?: string;
  width?: number;
}

export const Backside: React.FC<BacksideProps> = (props) => {
  const formattedDate = format(
    new Date(props?.startAt),
    "eee, d LLL yyyy - hh:mm aaaaa'm'"
  );
  return (
    <>
      <SlideRightVariant
        className="md:block hidden"
        formattedDate={formattedDate}
        {...props}
      />
      <ScaleUpVarian
        className="md:hidden block"
        formattedDate={formattedDate}
        {...props}
      />
    </>
  );
};

const SlideRightVariant: React.FC<BacksideProps> = ({
  active,
  description,
  venue,
  bookNowUrl,
  formattedDate,
  className,
  width,
}) => {
  const router = useRouter();
  const [ref] = usePortableTextTruncate({ maxLength: 200 });
  return (
    <motion.div
      style={{ width }}
      className={clsx(
        "h-full absolute top-0 | pl-5 pr-10 box-border ml-auto | bg-white",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      initial={{ left: 0 }}
      animate={{ left: active ? "48%" : 0 }}
      transition={{ type: "tween", duration: 0.4 }}
    >
      <motion.div
        className="flex flex-col justify-center items-center | h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{
          duration: 0.3,
          type: "tween",
          ease: "easeInOut",
          delay: 0.4,
        }}
      >
        <div className="flex-1 flex ">
          <span className="text-body-2 font-manrope text-gray--700" ref={ref}>
            <PortableText blocks={description} />
          </span>
        </div>
        <div className="w-full space-y-10">
          <div className="space-y-3">
            <span className="flex items-center space-x-2">
              <Location className="h-[18px]" />
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
          {bookNowUrl && (
            <Button onClick={() => router.push(bookNowUrl)}>Book Now</Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ScaleUpVarian: React.FC<BacksideProps> = ({
  active,
  description,
  formattedDate,
  venue,
  bookNowUrl,
  className,
  width,
}) => {
  const router = useRouter();
  const [ref] = usePortableTextTruncate({ maxLength: 200 });

  return (
    <motion.div
      style={{ width }}
      className={clsx(
        "absolute top-0 left-0 h-full w-full z-20 bg-black bg-opacity-80",
        className
      )}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 100,
      }}
      transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-[80%] mx-auto flex justify-center items-center flex-col h-full space-y-5">
        <span
          className="font-manrope text-body-1 text-white text-center"
          ref={ref}
        >
          <PortableText blocks={description} />
        </span>

        <span className="flex items-center space-x-2">
          <Location className="h-[18px] text-white" />
          <span className="font-manrope text-white text-body-2">
            {venue[0].name}
          </span>
        </span>
        <span className="flex items-center space-x-2">
          <Clock className="h-[18px] text-white" />
          <span className="font-manrope text-white text-body-2">
            <span>{formattedDate}</span>
          </span>
        </span>
        {bookNowUrl && (
          <Button onClick={() => router.push(bookNowUrl)}>Book Now</Button>
        )}
      </div>
    </motion.div>
  );
};
