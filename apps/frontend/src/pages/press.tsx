import React, { useCallback } from "react";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { groq } from "next-sanity";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { Release } from "@components/press/release";
import { KitsInfo } from "@components/press/kits-info";
import { PageHeaderProps, PageHeading } from "@components/shared/page-heading";
import { Container } from "@components/ui/container";

const query = pageQuery(groq`
  *[_type == "pressPage"][0]{
        ...,
        sections[]{
            ...,
           "image": ${withDimensions("image")},
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

  return (
    <div>
      {renderObjectArray(page.sections, {
        pageHeading: useCallback(
          (props: PageHeaderProps) => (
            <Container>
              <PageHeading {...props} color="#DE5742" />
            </Container>
          ),
          []
        ),
        "pressPage.kitInfo": KitsInfo,
      })}
    </div>
  );
};

export default Press;
