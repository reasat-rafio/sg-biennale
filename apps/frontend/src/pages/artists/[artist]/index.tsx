import { Artwork } from "@components/artist-details/artwork/artwork";
import { Hero } from "@components/artist-details/hero";
import { ProgrammesEvents } from "@components/artist-details/programmes-events";
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
    *[_type == "artist" && slug.current == $artist][0]{
        ...,
        images[] {
          ...        
          asset->{
            ...,
            metadata {
              dimensions
            }
          }
        },
        artworks[]-> {
          name,
          slug,
          description,
          images[]{
            ...,
            asset-> {
              ...,
              metadata{
                dimensions
              }
            }
          }
        },
        "relatedEvents" : *[_type == "events" && ^._id in relatedArtists[]._ref][]{
          _id,
          title,
          slug,
          description,
          startAt,
          venue[]->{
            _id,
            name,
            slug
          },
          images[]{
            ...,
            asset-> {
              ...,
              metadata{
                dimensions
              }
            }
          },
          relatedArtists[]-> {
            _id,
            name
          },
        },
    },
`);

const pathsQuery = groq`*[_type == 'artist'][]{
  slug,
  }`;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient("anonymous").fetch(pathsQuery);

  return {
    paths: slugs
      .filter((s: any) => s)
      .map((s: any) => ({ params: { artist: s.slug.current } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const ArtistDetailPage: NextPage<SanityProps> = (props) => {
  const { name, artworks, images, description, countries, relatedEvents } =
    props.data.page;

  return (
    <section>
      <Hero
        name={name}
        images={images}
        description={description}
        countries={countries}
      />
      <Artwork name={name} artworks={artworks} />
      {/* {relatedEvents?.length && (
        <ProgrammesEvents name={name} relatedEvents={relatedEvents} />
      )} */}
    </section>
  );
};

export default ArtistDetailPage;
