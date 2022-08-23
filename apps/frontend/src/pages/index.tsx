import { Artist } from "@components/home/artist/artist";
import { Hero } from "@components/home/hero/hero";
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
        "image": ${withDimensions("image")}
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
      news[]-> {
        _id,
        header,
        description,
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
      {renderObjectArray(page.sections, {
        // "homePage.hero": Hero,
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
