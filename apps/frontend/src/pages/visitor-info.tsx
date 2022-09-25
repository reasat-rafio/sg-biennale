import { PageHeaderProps, PageHeading } from "@components/shared/page-heading";
import { Container } from "@components/ui/container";
import { AccesibilityInfo } from "@components/visitor-info/accesibility-info";
import { MoreInfos } from "@components/visitor-info/more-infos";
import { Tour } from "@components/visitor-info/tour/tour";
import { siteQuery } from "@lib/query";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";

const query = groq`{
  "site": ${siteQuery},
  "page" : *[_type == "visitorInfoPage"][0]{
    ...,
    sections[]{
        ..., 
        "image": ${withDimensions("image")},
        shortGuide{
            ...,
            "icon": ${withDimensions("icon")},
            asset->
        },
        moreInfos[]{
            ...,
            "image": ${withDimensions("image")}
        },
        additionalInfo[]{
            ...,
            "icon": ${withDimensions("icon")}
        },
    }
  },
  "allVenues": *[_type == "venue"]{
    _id,
    name,
    slug,
    location,
    startAt,
    "image": ${withDimensions("image")}
  },
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const VisitorInfo: NextPage<SanityProps> = (props) => {
  const { page } = useSanityQuery(query, props).data;

  return (
    <>
      {renderObjectArray(page.sections, {
        pageHeading: useCallback(
          (data: PageHeaderProps) => (
            <Container>
              <PageHeading {...data} color="#74A0C1" />
            </Container>
          ),
          []
        ),
        "visitorInfoPage.moreInfo": MoreInfos,
        "visitorInfoPage.tour": Tour,
        "visitorInfoPage.accesibilityInfo": AccesibilityInfo,
      })}
    </>
  );
};

export default VisitorInfo;
