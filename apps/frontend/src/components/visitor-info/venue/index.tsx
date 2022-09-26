import { Container } from "@components/ui/container";
import { VenueProps } from "@lib/@types/visitor-info.types";
import { positioningAlgo } from "@lib/helpers/global.helpers";
import { useCallback, useEffect, useState } from "react";
import { FilteringSection } from "./filtering-section";
import { VenueList } from "./venue-list";
import { motion } from "framer-motion";
import { Button } from "@components/ui/button";

const cardsPerPage = 6;
export const Venue: React.FC<{
  allVenues: VenueProps[];
}> = ({ allVenues }) => {
  const [page, setPage] = useState(1);
  const [venues, setVenues] = useState(allVenues.slice(0, cardsPerPage));

  const imgPositionIngAlgo = positioningAlgo(venues.length);
  const extraPadding = () =>
    useCallback(
      () =>
        venues.reduce((previousValue, _, idx) => previousValue + 50 * idx, 0),
      [venues]
    );

  const showMoreLessButtonAction = () => {
    venues < allVenues ? setPage((prev) => prev + 1) : setPage(1);
  };

  useEffect(() => {
    setVenues(allVenues.slice(0, cardsPerPage * page));
  }, [page, allVenues, venues]);
  cardsPerPage;

  return (
    <Container className="py-xl flex flex-col space-y-12">
      <header className="flex space-x-2">
        <h2 className="flex-1 font-medium text-heading-6">Venue</h2>
        <span className="underline font-medium lg:text-xl text-base">
          Accessibility Info
        </span>
      </header>
      <FilteringSection setVenues={setVenues} allVenues={allVenues} />
      <VenueList
        venues={venues}
        extraPadding={extraPadding()}
        imgPositionIngAlgo={imgPositionIngAlgo}
      />

      {allVenues.length !== cardsPerPage ||
        (allVenues.length < cardsPerPage && (
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
          >
            <Button onClick={showMoreLessButtonAction} className="mx-auto">
              {venues.length === allVenues.length ? "Show Less" : "Show More"}
            </Button>
          </motion.div>
        ))}
    </Container>
  );
};
