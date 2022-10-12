import { Clock } from "@components/icons/clock";
import { Location } from "@components/icons/location";
import { LiquidButton } from "@components/ui/liquid-button";
import { RelatedArtistsProps, Venue } from "@lib/@types/event.types";
import { useWindowSize } from "@lib/hooks";
import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";

interface InformationProps {
  venue: Venue[];
  relatedArtists: RelatedArtistsProps[];
  startAt: Date;
}

export const Information: React.FC<InformationProps> = ({
  relatedArtists,
  startAt,
  venue,
}) => {
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
      <div className="col-span-7 grid grid-cols-12 gap-5">
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
      <div className="col-span-5 grid grid-cols-12 | gap-5 ">
        <span ref={secondaryBtnRef} className="col-span-5 w-full">
          <LiquidButton width={secondaryBtnWidth} variant="secondary">
            View Artist
          </LiquidButton>
        </span>
        <span ref={primaryBtnRef} className="col-span-7 w-full">
          <LiquidButton width={primaryBtnWidth} className="">
            Book Now
          </LiquidButton>
        </span>
      </div>
    </section>
  );
};

{
  /* <section className="flex | gap-5">
  <div className="flex-1 grid grid-cols-12 | gap-5">
    <div className="col-span-6">
      <span>Artist</span>
      <ul>
        {relatedArtists.map(({ _id, name }) => (
          <li key={_id}>{name}</li>
        ))}
      </ul>
    </div>
    <div className="col-span-6">
      <span>Venue & Details</span>
    </div>
  </div>
  <div className="max-w-lg flex space-x-5">
    <LiquidButton className="" variant="secondary">
      View Artist
    </LiquidButton>
    <span className="col-span-8">
      <LiquidButton className="">Book Now</LiquidButton>
    </span>
  </div>
</section>; */
}
