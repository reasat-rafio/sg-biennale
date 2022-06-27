import { DetailsPageImageCarousel } from "@components/common/deatils-page/image-carousel";
import { EventDescription } from "@components/event-details/event-description";
import { DetailsLayout } from "@components/ui/layouts/details-layout";
import { pageQuery } from "@lib/query";
import { sanityClient, sanityStaticProps } from "@utils/sanity";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";

const query = pageQuery(groq`
    *[_type == "events" && slug.current == $event][0]{
        ...,
        category[]->,
        images[] {
        ...        
        asset->{
          ...,
          metadata {
            dimensions
          }
        }
      },
    },
`);

const pathsQuery = groq`*[_type == 'events'][]{
  slug,
  }`;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient("anonymous").fetch(pathsQuery);

  return {
    paths: slugs
      .filter((s: any) => s)
      .map((s: any) => ({ params: { event: s.slug.current } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const EventDetailPage: NextPage<SanityProps> = (props) => {
  const {
    title,
    description,
    date,
    price,
    location,
    time,
    moreInfo,
    category,
    images,
  } = props.data.page;

  return (
    <DetailsLayout
      DescriptionBlock={
        <EventDescription
          title={title}
          description={description}
          date={date}
          price={price}
          location={location}
          time={time}
          moreInfo={moreInfo}
          category={category}
        />
      }
      CarouselBlock={<DetailsPageImageCarousel images={images} />}
    />
  );
};

export default EventDetailPage;
