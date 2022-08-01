import { Container } from "@components/ui/container";
import { pageQuery } from "@lib/query";
import {
  imageUrlBuilder,
  PortableText,
  sanityClient,
  sanityStaticProps,
} from "@utils/sanity";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { SanityImg } from "sanity-react-extra";

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
  const { name, description, images } = props.data.page;

  return (
    <Container className="min-h-[60vh] flex lg:flex-row flex-col-reverse | py-16 gap-5">
      <div className="flex-1">
        <h1 className="lg:text-3xl text-2xl font-semibold mb-4">{name}</h1>
        <span className="text-lg">
          <PortableText blocks={description} />
        </span>
      </div>
      <figure className="lg:max-h-[500px] | flex-1 mx-auto">
        <SanityImg
          className="lg:h-full lg:w-full h-fit w-fit object-contain"
          image={images[0]}
          builder={imageUrlBuilder}
          width={600}
          alt={`${name}`}
        />
      </figure>
    </Container>
  );
};

export default DirectorDetailPage;
