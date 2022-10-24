import { VenueProps } from "@lib/@types/visitor-info.types";
import { VenueListCard } from "./venue-list-card";

interface VenueListProps {
  venues: VenueProps[];
  extraPadding: () => number;
  imgPositionIngAlgo: number[];
}

export const VenueList: React.FC<VenueListProps> = ({
  extraPadding,
  imgPositionIngAlgo,
  venues,
}) => {
  return (
    <section className="pt-2" style={{ paddingBottom: extraPadding() }}>
      <div className="grid grid-cols-12 | lg:gap-8 gap-4">
        {Boolean(venues?.length) &&
          venues?.map((venue, index) => (
            <VenueListCard
              {...venue}
              key={venue._id}
              index={index}
              imgPositionIngAlgo={imgPositionIngAlgo}
            />
          ))}
      </div>
    </section>
  );
};
