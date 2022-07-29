import { Container } from "@components/ui/container";
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
    *[_type == "curatorial" && slug.current == $director][0]{
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
    },
`);

const pathsQuery = groq`*[_type == 'curatorial'][]{
  slug,
  }`;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient("anonymous").fetch(pathsQuery);

  return {
    paths: slugs
      .filter((s: any) => s)
      .map((s: any) => ({ params: { director: s.slug.current } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const DirectorDetailPage: NextPage<SanityProps> = (props) => {
  const { name, description, images, seo } = props.data.page;

  return (
    <>
      <Container className="min-h-[60vh] grid lg:grid-cols-2 | py-16">
        <h1 className="lg:text-3xl text-2xl font-semibold">{name}</h1>
        <span className="text-lg">
          <PortableText blocks={description} />
        </span>
      </Container>
    </>
  );
};

export default DirectorDetailPage;
