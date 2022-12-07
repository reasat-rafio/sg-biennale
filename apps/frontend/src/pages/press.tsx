import React, { useCallback, useRef } from "react";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { groq } from "next-sanity";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { Release } from "@components/press/release";
import { PageHeaderProps, PageHeading } from "@components/shared/page-heading";
import { Container } from "@components/ui/container";
import { RecentUpdate } from "@components/press/recent-update";
import { motion } from "framer-motion";
import { useIntersection } from "@lib/hooks";
import { KitsInfo } from "@components/press/kits-info";
import { MoreInfos } from "@components/common/more-info";

const query = pageQuery(groq`
  *[_type == "pressPage"][0]{
        ...,
        "recentUpdates" : *[_type == "news"] | order(_createdAt desc) [0...2]{
          _id,
          header,
          cta,
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
        sections[]{
            ...,
           "image": ${withDimensions("image")},
           cta {
              ...,
             "icon": ${withDimensions("icon")},
           },
            moreInfos[]{
            ...,
            "image": ${withDimensions("image")}
           },
           kitInfos[]{
            ...,
            "image": ${withDimensions("image")},
            cta {
              ...,
             "icon": ${withDimensions("icon")},
            },
           },
            releases[]-> {
                _id,
                header,
                description,
                slug,
                cta,
                file {
                  ...,
                  asset->
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
        },
    }
`);

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const Press: NextPage<SanityProps> = (props) => {
  const { page } = useSanityQuery(query, props).data;
  const ref = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(ref, { threshold: 0.4 });

  return (
    <div className="overflow-hidden">
      {renderObjectArray(page.sections, {
        pageHeading: useCallback(
          (props: PageHeaderProps) => (
            <Container>
              <PageHeading {...props} color="#DE5742" />
            </Container>
          ),
          []
        ),
      })}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: intersecting?.isIntersecting ? 0 : 3 }}
      >
        {renderObjectArray(page.sections, {
          "pressPage.recentUpdate": useCallback(
            (props: any) => (
              <RecentUpdate {...props} updates={page.recentUpdates} />
            ),
            []
          ),
          "pressPage.release": Release,
          "pressPage.kitInfo": KitsInfo,
          moreInfo: MoreInfos,
        })}
      </motion.div>
    </div>
  );
};

export default Press;
