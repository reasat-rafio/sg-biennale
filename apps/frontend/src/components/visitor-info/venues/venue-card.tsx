import { ChevronArrow } from "@components/icons/chevron-arrow";
import { Clock } from "@components/icons/clock";
import { Location } from "@components/icons/location";
import { Venue } from "@lib/@types/visitor-info.types";
import { imageUrlBuilder } from "@utils/sanity";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { SanityImg } from "sanity-react-extra";

interface VenueCardProps {
  vanue: Venue;
  className?: string;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  className,
  vanue: { faqs, image, name, location, timeAndDate, icon },
}) => {
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);

  const toggleAccordion = (FAQIndex: number) => {
    if (activeFAQIndex === FAQIndex) setActiveFAQIndex(null);
    else setActiveFAQIndex(FAQIndex);
  };

  return (
    <div className={clsx("h-min | flex flex-col | py-5 space-y-3", className)}>
      <div className="md:h-[400px] h-auto">
        <SanityImg
          className="w-full h-full | object-cover"
          width={500}
          image={image}
          builder={imageUrlBuilder}
          alt={name}
        />
      </div>
      <div className="flex">
        <h6 className="flex-1 items-center | text-lg font-semibold">{name}</h6>
        {/* {icon && (
          <SanityImg
            height={20}
            image={icon}
            builder={imageUrlBuilder}
            alt="icon"
          />
        )} */}
      </div>
      <div className="flex flex-col | space-y-1">
        <div className="flex items-center | space-x-2">
          <Location className="h-5 w-5" />
          <span>{location}</span>
        </div>
        <div className="flex space-x-2 | items-center">
          <Clock className="h-5 w-5" />
          <span>{timeAndDate}</span>
        </div>
      </div>

      <div className="text-sm | cursor-pointer">
        {faqs.map(({ key, answers, question, cta }, index) => (
          <div key={key} onClick={() => toggleAccordion(index)}>
            <div className="flex items-center | space-x-2">
              <span>{question}</span>
              <ChevronArrow className="h-5 w-5" />
            </div>
            {index === activeFAQIndex && (
              <div className="flex flex-col | py-3 space-y-2">
                <div className="grid grid-cols-12 | gap-2">
                  {answers.map(({ key, icon, description }) => (
                    <div className="flex col-span-12" key={key}>
                      <SanityImg
                        width={15}
                        image={icon}
                        builder={imageUrlBuilder}
                        alt="icon"
                      />
                      <p>{description}</p>
                    </div>
                  ))}
                </div>
                {cta && (
                  <button className="mr-auto | px-3 py-1 | border border-black | rounded-3xl ">
                    <Link href={cta?.href ?? "/"}>
                      <a>{cta.title}</a>
                    </Link>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
