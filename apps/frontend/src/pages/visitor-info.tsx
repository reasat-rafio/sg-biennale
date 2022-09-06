import { PageHeaderProps, PageHeading } from "@components/shared/page-heading";
import { Container } from "@components/ui/container";
import { AccesibilityInfo } from "@components/visitor-info/accesibility-info";
import { MoreInfos } from "@components/visitor-info/more-infos";
import { Tour } from "@components/visitor-info/tour/tour";
import { pageQuery } from "@lib/query";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";

const query = pageQuery(groq`
  *[_type == "visitorInfoPage"][0]{
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
            "icon": ${withDimensions("icon")}
        },
        additionalInfo[]{
            ...,
            "icon": ${withDimensions("icon")}
        },
        venues[]->{
            ...,
            "image": ${withDimensions("image")},
            faqs[]{
                ...,
                answers[]{
                    ...,
                    "icon" :${withDimensions("icon")}
                }
            }
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
