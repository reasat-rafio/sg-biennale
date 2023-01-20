import { Clock } from "@components/icons/clock";
import { Location } from "@components/icons/location";
import { Button } from "@components/ui/button";
import { RelatedArtistsProps, Venue } from "@lib/@types/event.types";
import { format } from "date-fns";

interface InformationProps {
  venue: Venue[];
  relatedArtists: RelatedArtistsProps[];
  startAt?: Date;
  bookNowUrl?: string;
}

export const Information: React.FC<InformationProps> = ({
  relatedArtists,
  startAt,
  venue,
  bookNowUrl,
}) => {
  return (
    <section className="grid grid-cols-12 | gap-5">
      <div className="lg:col-span-7 col-span-12 grid grid-cols-12 sm:gap-5 gap-2">
        <div className="col-span-6">
          <span className="text-gray--400 | text-body-2 font-manrope">
            Artist
          </span>
          <ul className="mt-2 | md:text-[24px] text-xl | font-medium">
            {relatedArtists?.map(({ _id, name }) => (
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

            {startAt && (
              <li className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>
                  {format(
                    new Date(startAt),
                    "eee, d LLL yyyy - hh:mm aaaaa'm'"
                  )}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="lg:col-span-5 col-span-12 grid grid-cols-12 | sm:gap-5 gap-2 bg-red-300">
        <span className="lg:col-span-7 sm:col-span-6 col-span-12  w-full">
          <div>
            <Button type="href" href={bookNowUrl} className="">
              Book Now
            </Button>
          </div>
        </span>
        {/* <span
          ref={secondaryBtnRef}
          className="lg:col-span-5 sm:col-span-6 col-span-12 w-full"
        >
           <Button width={secondaryBtnWidth} variant="secondary">
            View Artist
          </Button> 
        </span> */}

        {/* {bookNowUrl && ( */}

        {/* <div className="flex lg:flex-row flex-col lg:items-end | sm:space-x-3 sm:space-y-3 space-y-3 md:mt-5 mt-10">
          <div className="lg:flex-1">
            <Button
              className="lg:w-fit !w-full"
              href={cta?.href}
              type="href"
              variant="secondary"
            >
              {priceVal}
            </Button>
          </div>
          {additionalInfo && (
            <span className="text-body-2 text-gray--700">
              *{additionalInfo}
            </span>
          )}
        </div> */}

        {/* )} */}
      </div>
    </section>
  );
};
