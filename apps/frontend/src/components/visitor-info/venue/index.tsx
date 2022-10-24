import { Container } from "@components/ui/container";
import { positioningAlgo } from "@lib/helpers/global.helpers";
import { MouseEvent, useCallback, useRef } from "react";
import { FilteringSection } from "./filtering-section";
import { VenueList } from "./venue-list";
import { motion } from "framer-motion";
import useVisitorInfoStore from "@stores/visitor-info.store";
import { Header } from "@components/ui/header";
import { Anchor } from "@components/ui/anchor";
import { Button } from "@components/ui/button";

export const Venue: React.FC<{}> = ({}) => {
  const { allVenues, sortedVenues, page, setPage, cardsPerPage } =
    useVisitorInfoStore();
  const venueListRef = useRef<HTMLDivElement | null>(null);

  const imgPositionIngAlgo = positioningAlgo(sortedVenues.length);
  const extraPadding = () =>
    useCallback(
      () => sortedVenues.reduce((previousValue, _) => previousValue + 50, 0),
      [sortedVenues]
    );

  const showMoreLessButtonAction = () => {
    sortedVenues < allVenues ? setPage(page + 1) : setPage(1);
    if (sortedVenues.length === allVenues.length && venueListRef?.current)
      venueListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };
  const scrollToAccesiblityInfoSection = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      ?.querySelector(`#accesibility-info`)
      ?.scrollIntoView({ behavior: "smooth" });
  };
  const showShowMoreButton =
    allVenues.length !== cardsPerPage && allVenues.length > cardsPerPage;

  return (
    <Container className="py-xl flex flex-col space-y-12">
      <header className="flex space-x-2">
        <Header variant="secondary" className="flex-1">
          Venue
        </Header>

        <Anchor onClick={(e) => scrollToAccesiblityInfoSection(e as any)}>
          Accessibility Info
        </Anchor>
      </header>
      <FilteringSection />

      <div ref={venueListRef}>
        <VenueList
          venues={sortedVenues}
          extraPadding={extraPadding()}
          imgPositionIngAlgo={imgPositionIngAlgo}
        />
      </div>

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
