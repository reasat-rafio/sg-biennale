import { Clock } from "@components/icons/clock";
import { Location } from "@components/icons/location";
import { Button } from "@components/ui/button";
import { RelatedArtistsProps, Venue } from "@lib/@types/event.types";
import { useWindowSize } from "@lib/hooks";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface InformationProps {
  venue: Venue[];
  relatedArtists: RelatedArtistsProps[];
  startAt: Date;
  bookNowUrl?: string;
}

export const Information: React.FC<InformationProps> = ({
  relatedArtists,
  startAt,
  venue,
  bookNowUrl,
}) => {
  const router = useRouter();
  const windowWidth = useWindowSize()?.width ?? 0;
  const [primaryBtnWidth, setPrimaryBtnWidth] = useState(0);
  const [secondaryBtnWidth, setSecondaryBtnWidth] = useState(0);
  const formattedDate = format(
    new Date(startAt),
    "eee, d LLL yyyy - hh:mm aaaaa'm'"
  );

  const primaryBtnRef = useCallback(
    (node: HTMLSpanElement) => {
      if (node) {
        setPrimaryBtnWidth(node.getBoundingClientRect().width);
      }
    },
    [windowWidth]
  );
  const secondaryBtnRef = useCallback(
    (node: HTMLSpanElement) => {
      if (node) {
        setSecondaryBtnWidth(node.getBoundingClientRect().width);
      }
    },
    [windowWidth]
  );

  return (
    <section className="grid grid-cols-12 | gap-5">
      <div className="lg:col-span-7 col-span-12 grid grid-cols-12 sm:gap-5 gap-2">
        <div className="col-span-6">
          <span className="text-gray--400 | text-body-2 font-manrope">
            Artist
          </span>
          <ul className="mt-2 | md:text-[24px] text-xl | font-medium">
            {relatedArtists.map(({ _id, name }) => (
              <li key={_id}>{name}</li>
            ))}
          </ul>
        </div>

        <div className="col-span-6">
          <span className="text-gray--400 | text-body-2 font-manrope">
            Venue & Details
          </span>
          <ul className="flex flex-col | space-y-2 mt-2 | text-gray--700 | font-manrope text-body-2">
            <li className="flex items-center space-x-2">
              <Location className="h-5 w-5" />
              <span>{venue[0].name}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{formattedDate}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:col-span-5 col-span-12 grid grid-cols-12 | sm:gap-5 gap-2">
        {/* <span
          ref={secondaryBtnRef}
          className="lg:col-span-5 sm:col-span-6 col-span-12 w-full"
        >
           <Button width={secondaryBtnWidth} variant="secondary">
            View Artist
          </Button> 
        </span> */}

        {bookNowUrl && (
          <span className="lg:col-span-7 sm:col-span-6 col-span-12  w-full">
            <Button onClick={() => router.push(bookNowUrl)} className="">
              Book Now
            </Button>
          </span>
        )}
      </div>
    </section>
  );
};
