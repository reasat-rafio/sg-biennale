import React, { useCallback } from "react";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { groq } from "next-sanity";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { Methods } from "@components/support-us/methods";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { PageHeaderProps, PageHeading } from "@components/shared/page-heading";
import { Donation } from "@components/support-us/donation";
import { Decor } from "@components/support-us/decor";
import { Volunteer } from "@components/support-us/volunteer";

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
        pageHeading: useCallback(
          (props: PageHeaderProps) => (
            <Container>
              <PageHeading position="center" {...props} color="#F3F2EC" />
            </Container>
          ),
          []
        ),
        "supportUs.volunteer": Volunteer,
        "supportUs.donation": Donation,
        "supportUs.decor": Decor,
      })}
    </div>
  );
};

export default SupportUs;
