import { FilteringSection } from "@components/programmes-and-events/filter/filtering-section";
import { ProgrammesEventList } from "@components/programmes-and-events/programmes-events-list";
import { Container } from "@components/ui/container";
import { IPgrammeEvents } from "@lib/@types/programmes-events-types";
import { siteQuery } from "@lib/query";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useEffect } from "react";

const query = groq`{
  "site": ${siteQuery},
  "events":*[_type == "events"][]{
        _id,
        title,
        eventStartDate,
        eventEndDate,
        venue[]->{
          name,
          slug
        },
        price,
        eventStartTime,
        eventEndTime,
        slug,
        category[]->,
        images[] {
        asset->{
          ...,
          metadata {
            dimensions
          }
        }
      },
    },
    "allCategories": *[_type == "category"]{
      _id,
      name,
      slug
    },
    "allVenues": *[_type == "venue"]{
      _id,
      name,
      slug
    }
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const ProgrammesAndEvents: NextPage<SanityProps> = (props) => {
  const { events, allCategories, allVenues } = useSanityQuery(
    query,
    props
  ).data;

  const {
    initialVisibleItems,
    setAllProgrammesAndEvents,
    setVisualProgrammesAndEvents,
    setAllCategories,
    setAllVenues,
  } = useProgrammesAndEventsStore();

  useEffect(() => {
    setAllProgrammesAndEvents(events);
    setVisualProgrammesAndEvents(
      (events as IPgrammeEvents[]).slice(0, initialVisibleItems)
    );
    setAllCategories(allCategories);
    setAllVenues(allVenues);
  }, [
    events,
    allCategories,
    allVenues,
    initialVisibleItems,
    setAllProgrammesAndEvents,
    setVisualProgrammesAndEvents,
    setAllCategories,
    setAllVenues,
  ]);

  return (
    <Container>
      <header>
        <h1 className="font-semibold text-3xl py-3">Programmes & Events</h1>
      </header>
      <FilteringSection />
      <ProgrammesEventList />
    </Container>
  );
};

export default ProgrammesAndEvents;
