import { Container } from "@components/ui/container";
import { positioningAlgo } from "@lib/helpers/global.helpers";
import { useCallback } from "react";
import { FilteringSection } from "./filtering-section";
import { VenueList } from "./venue-list";
import { motion } from "framer-motion";
import { Button } from "@components/ui/button";
import useVisitorInfoStore from "@stores/visitor-info.store";

export const Venue: React.FC<{}> = ({}) => {
  const { allVenues, sortedVenues, page, setPage, cardsPerPage } =
    useVisitorInfoStore();

  const imgPositionIngAlgo = positioningAlgo(sortedVenues.length);
  const extraPadding = () =>
    useCallback(
      () =>
        sortedVenues.reduce(
          (previousValue, _, idx) => previousValue + 50 * idx,
          0
        ),
      [sortedVenues]
    );

  const showMoreLessButtonAction = () => {
    sortedVenues < allVenues ? setPage(page + 1) : setPage(1);
  };

  const showShowMoreButton =
    allVenues.length !== cardsPerPage && allVenues.length > cardsPerPage;

  return (
    <Container className="py-xl flex flex-col space-y-12">
      <header className="flex space-x-2">
        <h2 className="flex-1 font-medium text-heading-6">Venue</h2>
        <span className="underline font-medium lg:text-xl text-base">
          Accessibility Info
        </span>
      </header>
      <FilteringSection />
      <VenueList
        venues={sortedVenues}
        extraPadding={extraPadding()}
        imgPositionIngAlgo={imgPositionIngAlgo}
      />

      {showShowMoreButton && (
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
        >
          <Button onClick={showMoreLessButtonAction} className="mx-auto">
            {sortedVenues.length === allVenues.length
              ? "Show Less"
              : "Show More"}
          </Button>
        </motion.div>
      )}
    </Container>
  );
};
