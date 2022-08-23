import { ArtworkDescription } from "@components/artwok-details/artwork-description";
import { DetailsPageImageCarousel } from "@components/common/deatils-page/image-carousel";
import { DetailsLayout } from "@components/ui/layouts/details-layout";
import { pageQuery } from "@lib/query";
import {
  imageUrlBuilder,
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
import { NextSeo } from "next-seo";

const query = pageQuery(groq`
    *[_type == "artwork" && slug.current == $artwork && artist->.slug.current == $artist][0]{
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
  artist->{
    slug
  }
  }`;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient("anonymous").fetch(pathsQuery);

  return {
    // paths: slugs
    //   .filter((s: any) => s)
    //   .map((s: any) => ({
    //     params: { artist: s.artist.slug.current, artwork: s.slug.current },
    //   })),
    paths: [],
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
  const { name, description, images, moreInfo, seo } = props.data.page;

  const openGraphImages = seo?.ogImage
    ? [
        { w: 800, h: 600 },
        { w: 1200, h: 630 },
        { w: 600, h: 600 },
        { w: 256, h: 256 },
      ].map(({ w, h }) => ({
        url: `${imageUrlBuilder.image(seo?.ogImage).width(w).height(h).url()}`,
        width: w,
        height: h,
        alt: `${seo?.title}`,
      }))
    : [];

  return (
    <div>
      {/* <NextSeo
        title={seo?.title}
        description={seo?.description}
        openGraph={{
          images: openGraphImages,
        }}
      />
      <DetailsLayout
        DescriptionBlock={
          <ArtworkDescription
            name={name}
            description={description}
            moreInfo={moreInfo}
          />
        }
        CarouselBlock={<DetailsPageImageCarousel images={images} />}
      /> */}
    </div>
  );
};

export default ArtworkDetailPage;
