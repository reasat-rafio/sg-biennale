import { Artist } from "@components/home/artist/artist";
import { Introduction } from "@components/home/introduction/introduction";
import { News } from "@components/home/news/news";
import { Promotion } from "@components/home/promotion";
import { Organisations } from "@components/home/organisation/organisation";
import { pageQuery } from "@lib/query";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { Hero } from "@components/home/hero/hero";
import { useCallback } from "react";
import { HomHeroProps } from "@lib/@types/home.types";
import { Carousel } from "@components/home/hero/carousel";

const query = pageQuery(groq`
  *[_type == "homePage"][0]{
    ...,
    sections[]{
      ...,
      "image": ${withDimensions("image")},
      organisations[]{
        ...,
        "logo": ${withDimensions("logo")}
      },
      promotions[] {
        ...,
        "image": ${withDimensions("image")}
      },
      collection[]{
        ..., 
        "image": ${withDimensions("image")},
        video {
          ...,
          "webm": video_webm.asset->url,
          "mp4": video_mp4.asset->url
        },
      },
      artists[]->{
        _id,
        name,
        description,
        slug,
        countries,
        images[] {
          ..., 
          asset->{
            ...,
            metadata {
              dimensions
            }
          }
        },
        artworks[]-> {
          images[] {
            ..., 
            asset->{
              ...,
              metadata {
                dimensions
             }
            }
          },
        }
      },
      newsCollection [] {
        ...,
        "image": ${withDimensions("image")}
      }
    }
  }
`);

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const Home: NextPage<SanityProps> = (props) => {
  const {
    page,
    site: {
      site: { kvs },
    },
  } = useSanityQuery(query, props).data;

  return (
    <div>
      <Carousel kvs={kvs} />
      {renderObjectArray(page.sections, {
        "homePage.hero": useCallback(
          (props: HomHeroProps) => <Hero {...props} />,
          []
        ),
        "homePage.introduction": Introduction,
        "homePage.promotion": Promotion,
        "homePage.artists": Artist,
        "homePage.news": News,
        "homePage.organisations": Organisations,
      })}
    </div>
  );
};

export default Home;
