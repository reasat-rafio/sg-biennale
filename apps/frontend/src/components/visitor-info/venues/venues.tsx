import { Highlight, MoreInfo, Venue } from "@lib/@types/visitor-info.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { VenueCard } from "./venue-card";

interface VenuesProps {
  type: string;
  additionalInfo: MoreInfo[];
  highlight: Highlight;
  title: string;
  venues: Venue[];
}

export const Venues: React.FC<VenuesProps> = ({ title, venues, highlight }) => {
  return (
    <section className="py-10">
      <header className="flex">
        <h3 className="text-lg font-medium flex-1">{title}</h3>
        <div className="flex space-x-2 items-center">
          <SanityImg
            width={18}
            builder={imageUrlBuilder}
            image={highlight.icon}
            alt={`${highlight.title}'s icon`}
          />
          <span className="text-sm">{highlight.title}</span>
        </div>
      </header>

      <div className="grid grid-cols-12 lg:gap-10 gap-3">
        {venues.map((vanue) => (
          <VenueCard
            className="lg:col-span-6 col-span-12"
            key={vanue.id}
            vanue={vanue}
          />
        ))}
      </div>
    </section>
  );
};
