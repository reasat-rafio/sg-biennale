import { Carousel } from "@components/event-details/carousel";
import { Information } from "@components/event-details/information";
import { Anchor } from "@components/ui/anchor";
import { Container } from "@components/ui/container";
import { EventDetailProps } from "@lib/@types/event.types";
import { pageQuery } from "@lib/query";
import { PortableText, sanityClient, sanityStaticProps } from "@utils/sanity";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useRouter } from "next/router";

const query = pageQuery(groq`
    *[_type == "events" && slug.current == $event][0]{
        _id,
        title,
        startAt,
        description,
        bookNowUrl,
        venue[]->{
          _id,
          name,
          slug
        },
        relatedArtists[]->{
          _id,
          name,
          slug,
        },
        images[] {
          ..., 
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
    images,
    venue,
    relatedArtists,
    startAt,
    bookNowUrl,
  }: EventDetailProps = props.data.page;
  const router = useRouter();

  const onAnchorClickAction = () => router.push("/programmes-events");

  return (
    <section className="pt-x">
      <Container>
        <Anchor onClick={onAnchorClickAction} className="text-gray--700">
          Back to Event List
        </Anchor>
        <header className="my-7">
          <h1 className="2xl:text-heading-3 xl:text-heading-4 text-heading-5 font-medium md:text-left text-center">
            {title}
          </h1>
        </header>
      </Container>
      <Carousel images={images} />

      <Container>
        <div className="text-gray--700 font-manrope text-body-2 | my-xl">
          <PortableText blocks={description} />
        </div>
        <Information
          venue={venue}
          relatedArtists={relatedArtists}
          startAt={startAt}
          bookNowUrl={bookNowUrl}
        />
      </Container>
    </section>
  );
};

export default EventDetailPage;
