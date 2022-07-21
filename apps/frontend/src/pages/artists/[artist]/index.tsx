import { ArtistDescription } from "@components/artist-details/artist-description";
import { DetailsPageImageCarousel } from "@components/common/deatils-page/image-carousel";
import { Container } from "@components/ui/container";
import { DetailsLayout } from "@components/ui/layouts/details-layout";
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
  const { name, description, images, moreInfo } = props.data.page;

  return (
    // <DetailsLayout
    //   DescriptionBlock={
    //     <ArtistDescription
    //       name={name}
    //       description={description}
    //       moreInfo={moreInfo}
    //     />
    //   }
    //   CarouselBlock={<DetailsPageImageCarousel images={images} />}
    // />
    <Container className="min-h-[60vh] grid lg:grid-cols-2 | py-16">
      <h1 className="lg:text-3xl text-2xl font-semibold">{name}</h1>
      <span className="text-lg">
        <PortableText blocks={description} />
      </span>
    </Container>
  );
};

export default ArtistDetailPage;