import React from "react";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { groq } from "next-sanity";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { Donation } from "@components/support-us/donation";
import { Decor } from "@components/support-us/decor";
import { Volunteer } from "@components/support-us/volunteer";
import { Hero } from "@components/support-us/hero";
import { MoreInfos } from "@components/common/more-info";

const query = pageQuery(groq`
  *[_type == "supportUsPage"][0]{
    ...,
    sections[]{
      ...,
      "image": ${withDimensions("image")},
      cta {
        ...,
        "icon": ${withDimensions("icon")},
      },
      moreInfos[]{
        ...,
        'image': ${withDimensions("image")},
      },
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
`);

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const SupportUs: NextPage<SanityProps> = (props) => {
  const { page } = useSanityQuery(query, props).data;

  return (
    <div>
      {renderObjectArray(page.sections, {
        "supportUs.hero": Hero,
        "supportUs.volunteer": Volunteer,
        "supportUs.donation": Donation,
        "supportUs.decor": Decor,
        moreInfo: MoreInfos,
      })}
    </div>
  );
};

export default SupportUs;
