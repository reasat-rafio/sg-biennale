import { Carousel } from "@components/[event]/carousel";
import { Information } from "@components/[event]/information";
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

const query = pageQuery(groq`
    *[_type == "events" && slug.current == $event][0]{
        _id,
        seo,
        title,
        startAt,
        description,
        additionalInfo,
        cta,
        hideCta,
        price,
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
    cta,
    additionalInfo,
    hideCta,
    price,
  }: EventDetailProps = props.data.page;

  return (
    <section className="pt-x">
      <Container>
        <Anchor href="/programmes-events" className="text-gray--700">
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
        <div className="text-gray--700 font-manrope prose max-w-none | my-x">
          <PortableText blocks={description} />
        </div>
        <Information
          venue={venue}
          relatedArtists={relatedArtists}
          startAt={startAt}
          cta={cta}
          additionalInfo={additionalInfo}
          hideCta={hideCta}
          price={price}
        />
      </Container>
    </section>
  );
};

export default EventDetailPage;
