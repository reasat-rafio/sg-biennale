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
  vanue: { faqs, image, name, location, timeAndDate },
}) => {
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);

  const toggleAccordion = (FAQIndex: number) => {
    if (activeFAQIndex === FAQIndex) setActiveFAQIndex(null);
    else setActiveFAQIndex(FAQIndex);
  };

  return (
    <div className={clsx("py-5 h-min flex flex-col space-y-3", className)}>
      <div className="md:h-[400px] h-auto">
        <SanityImg
          className="w-full h-full object-cover"
          width={500}
          image={image}
          builder={imageUrlBuilder}
          alt={name}
        />
      </div>
      <h6 className="text-lg font-semibold">{name}</h6>
      <div className="flex flex-col space-y-1">
        <div className="flex space-x-2 items-center">
          <Location className="h-5 w-5" />
          <span>{location}</span>
        </div>
        <div className="flex space-x-2 items-center">
          <Clock className="h-5 w-5" />
          <span>{timeAndDate}</span>
        </div>
      </div>

      <div className="text-sm cursor-pointer">
        {faqs.map(({ key, answers, question, cta }, index) => (
          <div key={key} onClick={() => toggleAccordion(index)}>
            <div className="flex items-center space-x-2">
              <span>{question}</span>
              <ChevronArrow className="h-5 w-5" />
            </div>
            {index === activeFAQIndex && (
              <div className="py-3 flex flex-col space-y-2">
                <div className="grid grid-cols-12">
                  {answers.map(({ key, icon, description }) => (
                    <div
                      className="flex space-x-2 lg:col-span-6 col-span-12"
                      key={key}
                    >
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
                  <button className="px-3 py-1 border border-black rounded-3xl mr-auto">
                    <Link href={cta.href}>
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
