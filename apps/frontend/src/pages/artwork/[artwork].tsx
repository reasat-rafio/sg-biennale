import { ArtworkDescription } from "@components/artwok-details/artwork-description";
import { DetailsPageImageCarousel } from "@components/common/deatils-page/image-carousel";
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
    *[_type == "artwork" && slug.current == $artwork][0]{
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

const pathsQuery = groq`*[_type == 'artwork'][]{
  slug,
  }`;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient("anonymous").fetch(pathsQuery);

  return {
    paths: slugs
      .filter((s: any) => s)
      .map((s: any) => ({ params: { artwork: s.slug.current } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const ArtworkDetailPage: NextPage<SanityProps> = (props) => {
  const { name, description, images, moreInfo } = props.data.page;

  return (
    <DetailsLayout
      DescriptionBlock={
        <ArtworkDescription
          name={name}
          description={description}
          moreInfo={moreInfo}
        />
      }
      CarouselBlock={<DetailsPageImageCarousel images={images} />}
    />
  );
};

export default ArtworkDetailPage;
