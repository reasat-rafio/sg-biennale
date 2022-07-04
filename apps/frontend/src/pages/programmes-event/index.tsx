import { FilteringSection } from "@components/programmes-and-events/filter/filtering-section";
import { ProgrammesEventList } from "@components/programmes-and-events/programmes-events-list";
import { Container } from "@components/ui/container";
import { IPgrammeEvents } from "@lib/@types/programmes-events-types";
import { pageQuery } from "@lib/query";
import useProgrammesAndEventsStore from "@stores/programme-event-store";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useEffect } from "react";

const query = pageQuery(groq`
    *[_type == "events"]{
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
    }
`);

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const ProgrammesAndEvents: NextPage<SanityProps> = (props) => {
  const { page } = useSanityQuery(query, props).data;

  const {
    initialVisibleItems,
    setAllProgrammesAndEvents,
    setVisualProgrammesAndEvents,
  } = useProgrammesAndEventsStore();

  useEffect(() => {
    setAllProgrammesAndEvents(page);
    setVisualProgrammesAndEvents(
      (page as IPgrammeEvents[]).slice(0, initialVisibleItems)
    );
  }, [
    page,
    initialVisibleItems,
    setAllProgrammesAndEvents,
    setVisualProgrammesAndEvents,
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
