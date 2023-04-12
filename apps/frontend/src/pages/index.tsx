import { MoreInfos } from "@components/common/more-info";
import { Hero } from "@components/home/hero/hero";
import { KV } from "@components/home/hero/kv";
import { HighLight } from "@components/home/highlight";
import { Introduction } from "@components/home/introduction/introduction";
import { News } from "@components/home/news/news";
import { Organisations } from "@components/home/organisation";
import { HomHeroProps } from "@lib/@types/home.types";
import { pageQuery } from "@lib/query";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import Head from "next/head";
import { useCallback } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";

const query = pageQuery(groq`
  *[_type == "homePage"][0]{
    ...,
    sections[]{
      ...,
      "image": ${withDimensions("image")},
      kvs[] {
        ..., 
        asset->{
          ...,
          metadata {
            dimensions
          }
        }
      },
      moreInfos[]{
        ...,
        'image': ${withDimensions("image")},
      },
      information {
        ...,
        address{
          ...,
          "icon": ${withDimensions("icon")},
        },
        socials[]{
          ...,
          "icon": ${withDimensions("icon")},
        },
      },
      organisations[]{
        ...,
        "logo": ${withDimensions("logo")}
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
      highlights[]->{
        _id,
        _type,
        name,
        title,
        description,
        slug,
        countries,
        location,
        startAt,
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
  const { page } = useSanityQuery(query, props).data;

  return (
    <div>
      <Head>
        <meta
          name="facebook-domain-verification"
          content={process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION}
        />
      </Head>
      {renderObjectArray(page.sections, {
        "homePage.kv": KV,
        "homePage.hero": useCallback(
          (props: HomHeroProps) => <Hero {...props} />,
          []
        ),
        "homePage.introduction": Introduction,
        "homePage.highlight": HighLight,
        "homePage.news": News,
        "homePage.organisations": Organisations,
        moreInfo: MoreInfos,
      })}
    </div>
  );
};

export default Home;
