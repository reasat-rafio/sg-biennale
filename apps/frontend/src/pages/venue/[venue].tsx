import { Carousel } from "@components/[venue]/carousel";
import { Description } from "@components/[venue]/description";
import { Hero } from "@components/[venue]/hero";
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
    *[_type == "venue" && slug.current == $venue][0]{
        seo,
        _id,
        name,
        cta,
        content[]{
          ...,
          asset->{
            ...,
            metadata {
              dimensions
            }
          }
        },
        iformations,
        images[]{
          ..., 
          asset->{
            ...,
            metadata {
              dimensions
            }
          }
        },
    }
`);

const pathsQuery = groq`*[_type == 'venue'][]{
  slug,
  }`;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient("anonymous").fetch(pathsQuery);

  return {
    paths: slugs
      .filter((s: any) => s)
      .map((s: any) => ({ params: { venue: s.slug.current } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const VenueDetailPage: NextPage<SanityProps> = (props) => {
  const { name, images, content, iformations, cta } = props.data.page;

  return (
    <section>
      {images?.length && (
        <Hero
          name={name}
          image={images[0]}
          informations={iformations}
          cta={cta}
        />
      )}
      <Description content={content} />
      <Carousel images={images} />
    </section>
  );
};
export default VenueDetailPage;
