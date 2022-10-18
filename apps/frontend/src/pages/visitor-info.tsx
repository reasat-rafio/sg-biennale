import { PageHeaderProps, PageHeading } from "@components/shared/page-heading";
import { Container } from "@components/ui/container";
import { AccesibilityInfo } from "@components/visitor-info/accesibility-info";
import { Map } from "@components/visitor-info/map";
import { MoreInfos } from "@components/visitor-info/more-infos";
import { Venue } from "@components/visitor-info/venue";
import { FilteringLogic } from "@components/visitor-info/venue/filtering-logic";
import { siteQuery } from "@lib/query";
import useVisitorInfoStore from "@stores/visitor-info.store";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useEffect } from "react";
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
  "allVenues": *[_type == "venue"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    location,
    startAt,
    direction,
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
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const VisitorInfo: NextPage<SanityProps> = (props) => {
  const { page, allVenues } = useSanityQuery(query, props).data;
  const { setAllVenues, setSortedVenues } = useVisitorInfoStore();

  useEffect(() => {
    setAllVenues(allVenues);
    setSortedVenues(allVenues);
  }, [allVenues, setAllVenues, setSortedVenues]);

  return (
    <section className="overflow-hidden">
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
      })}
      <FilteringLogic>
        <Venue />
      </FilteringLogic>
      <Map />
      {renderObjectArray(page.sections, {
        "visitorInfoPage.accesibilityInfo": AccesibilityInfo,
      })}
    </section>
  );
};

export default VisitorInfo;
