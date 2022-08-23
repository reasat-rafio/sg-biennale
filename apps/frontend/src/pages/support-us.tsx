import React from "react";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { groq } from "next-sanity";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { Container } from "@components/ui/container";
import { Header } from "@components/ui/header";
import { Methods } from "@components/support-us/methods";

const query = pageQuery(groq`
  *[_type == "supportUsPage"][0]
`);

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const SupportUs: NextPage<SanityProps> = (props) => {
  // const {
  //   page: { header, methods },
  // } = useSanityQuery(query, props).data;

  return (
    <Container className="py-section">
      {/* <Header type="h1">{header}</Header>
      <Methods methods={methods} /> */}
    </Container>
  );
};

export default SupportUs;
