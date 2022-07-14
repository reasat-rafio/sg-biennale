import React from "react";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { withDimensions, renderObjectArray } from "sanity-react-extra";
import { groq } from "next-sanity";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { Hero } from "@components/about/hero";

const query = pageQuery(groq`
  *[_type == "aboutPage"][0]{
        ...,
        sections[]{
            ...,
            'image': ${withDimensions("image")},
            teamCollection[]{
              ...,
              'image': ${withDimensions("image")},
            },
            aboutCollection[]{
              ...,
              'image': ${withDimensions("image")},
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

  console.log(page.sections);

  return (
    <div>
      {renderObjectArray(page.sections, {
        "aboutPage.hero": Hero,
      })}
    </div>
  );
};

export default About;
