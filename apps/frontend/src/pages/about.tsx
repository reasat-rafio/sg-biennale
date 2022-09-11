import React from "react";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { withDimensions, renderObjectArray } from "sanity-react-extra";
import { groq } from "next-sanity";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { Hero } from "@components/about/hero";
import { CuratorialTeam } from "@components/about/curatorial-team";
import { AboutUs } from "@components/about/about-us";
import { PostEdition } from "@components/about/post-edition";
import { Team } from "@components/about/team";

const query = pageQuery(groq`
  *[_type == "aboutPage"][0]{
        ...,
        sections[]{
            ...,
            'image': ${withDimensions("image")},
            cta {
              ...,
              "icon": ${withDimensions("icon")},
            },
            teamCollection[] {
              ...,
              team->{
                ...,
              'image': ${withDimensions("image")},
              }
            },
            aboutCollection[]{
              ...,
              item{
                ...,
              'image': ${withDimensions("image")},
              }
            },
            pastEditionCollection[]{
              ...,
              'image': ${withDimensions("image")},
            }
        },
    }
`);

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const About: NextPage<SanityProps> = (props) => {
  const { page } = useSanityQuery(query, props).data;

  return (
    <div>
      {renderObjectArray(page.sections, {
        // "aboutPage.hero": Hero,
        "aboutPage.curatorialTeam": CuratorialTeam,
        "aboutPage.team": Team,
        // "aboutPage.about": AboutUs,
        // "aboutPage.postEdition": PostEdition,
      })}
    </div>
  );
};

export default About;
