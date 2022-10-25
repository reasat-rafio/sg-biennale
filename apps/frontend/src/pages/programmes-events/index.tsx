import dynamic from "next/dynamic";
import { siteQuery } from "@lib/query";
import useProgrammesAndEventsStore from "@stores/programme-event.store";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useEffect } from "react";
import { PageHeaderProps, PageHeading } from "@components/shared/page-heading";
import { renderObjectArray } from "sanity-react-extra";
import { AllEvents } from "@components/programmes-and-events/all-events";
import { filterPastEvents } from "@lib/helpers/programme-event.helper";
import { FilteringLogic } from "@components/programmes-and-events/all-events/filters/filtering-logic";
import { Container } from "@components/ui/container";
const ClosestEvent = dynamic(
  () => import("@components/programmes-and-events/closest-event"),
  {
    ssr: false,
  }
);
const query = groq`{
  "site": ${siteQuery},
  "page": *[_type == "programmesEventsPage"][0]{
    ...,
    sections[]{
      ...,
      closestEvents[]->{
        _id,
        images[] {
          asset->{
            ...,
            metadata {
             dimensions
            }
          }
        },
        title,
        description,
        slug,
        startAt,
        venue,
        relatedArtists,
      }
    }
  },
  "events":*[_type == "events"][]{
        _id,
        title,
        description,
        price,
        slug,
        startAt,
        endAt,
        additionalInfo,
        cta,
        hideCta,
        venue[]->{
          _id,
          name,
          slug
        },
        relatedArtists[]->{
          _id,
          name
        },
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
    },
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const ProgrammesAndEvents: NextPage<SanityProps> = (props) => {
  const { events, allCategories, allVenues, page } = useSanityQuery(
    query,
    props
  ).data;
  const currentISODate = new Date().toISOString();
  const _events = filterPastEvents(currentISODate, events);

  const {
    setAllCategories,
    setAllVenues,
    setAllProgrammesAndEvents,
    setSortedProgrammesAndEvents,
  } = useProgrammesAndEventsStore();

  useEffect(() => {
    setAllProgrammesAndEvents(_events);
    setSortedProgrammesAndEvents(_events);
    setAllCategories(allCategories);
    setAllVenues(allVenues);
  }, [
    events,
    allCategories,
    allVenues,
    setAllProgrammesAndEvents,
    setSortedProgrammesAndEvents,
    setAllCategories,
    setAllVenues,
  ]);

  return (
    <>
      {renderObjectArray(page.sections, {
        pageHeading: useCallback(
          (data: PageHeaderProps) => (
            <Container>
              <PageHeading
                headerClassName="max-w-[210px] sm:max-w-max"
                {...data}
                color="#292221"
              />
            </Container>
          ),
          []
        ),
        "programmesEventsPage.closestEvent": ClosestEvent,
      })}
      <FilteringLogic>
        <AllEvents />
      </FilteringLogic>
    </>
  );
};

export default ProgrammesAndEvents;
