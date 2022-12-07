import React, { useEffect, useRef } from "react";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { withDimensions, renderObjectArray } from "sanity-react-extra";
import { groq } from "next-sanity";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { CuratorialTeam } from "@components/about/curatorial-team";
import { AboutUs } from "@components/about/about-us";
import { Team } from "@components/about/team";
import { PastEdition } from "@components/about/past-edition";
import { Modals } from "@components/about/modals";
import { AboutSponsors } from "@components/about/about-sponsors";
import { MoreInfos } from "@components/common/more-info";

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
            aboutCollection[]{
              ...,
              'image': ${withDimensions("image")},
            },
            sponsorCollection[]{
              ...,
              'image': ${withDimensions("image")},
            },
            pastEditionCollection[]-> {
              ...,
              'image': ${withDimensions("image")},
            },
            moreInfos[]{
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
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={pageRef} className="h-full ">
        {renderObjectArray(page.sections, {
          // "aboutPage.hero": Hero,
          "aboutPage.curatorialTeam": CuratorialTeam,
          "aboutPage.team": Team,
          "aboutPage.aboutSponsors": AboutSponsors,
          "aboutPage.about": AboutUs,
          "aboutPage.pastEdition": PastEdition,
          moreInfo: MoreInfos,
        })}
      </div>
      <Modals />
    </>
  );
};
export default About;
