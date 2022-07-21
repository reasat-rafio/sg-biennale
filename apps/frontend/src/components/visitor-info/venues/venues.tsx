import { Highlight, MoreInfo, Venue } from "@lib/@types/visitor-info.types";
import { imageUrlBuilder } from "@utils/sanity";
import { SanityImg } from "sanity-react-extra";
import { MoreInfoBlock } from "../more-info-block";
import { VenueCard } from "./venue-card";
import GoogleMapReact from "google-map-react";
import { Header } from "@components/ui/header";

interface VenuesProps {
  type: string;
  additionalInfo: MoreInfo[];
  highlight: Highlight;
  title: string;
  venues: Venue[];
}

export const Venues: React.FC<VenuesProps> = ({
  title,
  venues,
  highlight,
  additionalInfo,
}) => {
  return (
    <section className="py-10">
      {/* <header>
        <Header>{title}</Header> 
       <div className="flex space-x-2 items-center">
          <SanityImg
            width={18}
            builder={imageUrlBuilder}
            image={highlight.icon}
            alt={`${highlight.title}'s icon`}
          />
          <span className="text-sm">{highlight.title}</span>
        </div> 
      </header> */}

      {/* <div className="grid grid-cols-12 | lg:gap-10 gap-3">
        {venues.map((vanue) => (
          <VenueCard
            className="lg:col-span-6 col-span-12"
            key={vanue.id}
            vanue={vanue}
          />
        ))}
      </div> */}
      {/* 
      <div className="lg:h-[90vh] h-[45vh] | py-10">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "",
          }}
          defaultCenter={{
            lat: 59.95,
            lng: 30.33,
          }}
          defaultZoom={11}
        />
      </div> */}

      <div className="grid grid-cols-12 | xl:gap-x-24 xl:gap-y-16 gap-5">
        {additionalInfo.map((data) => (
          <MoreInfoBlock
            className="lg:col-span-6 col-span-12"
            key={data.key}
            moreInfo={data}
          />
        ))}
      </div>
    </section>
  );
};
