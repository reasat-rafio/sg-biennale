import { Hero } from "@components/venue-details/hero";
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
        _id,
        name,
        description,
        iformations,
        images[] {
          ...        
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
  const { _id, name, images, description, iformations } = props.data.page;

  return (
    <section>
      <Hero name={name} image={images[0]} informations={iformations} />
    </section>
  );
};
export default VenueDetailPage;
