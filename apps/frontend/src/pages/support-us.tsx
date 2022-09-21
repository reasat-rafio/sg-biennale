import React, { useRef } from "react";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { groq } from "next-sanity";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { Donation } from "@components/support-us/donation";
import { Decor } from "@components/support-us/decor";
import { Volunteer } from "@components/support-us/volunteer";
import { motion } from "framer-motion";
import { useIntersection } from "@lib/hooks";
import { Hero } from "@components/support-us/hero";

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
  const ref = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(ref, { threshold: 0.4 });

  return (
    <div>
      {renderObjectArray(page.sections, {
        "supportUs.hero": Hero,
      })}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: intersecting?.isIntersecting ? 0 : 3 }}
      >
        {renderObjectArray(page.sections, {
          "supportUs.volunteer": Volunteer,
          "supportUs.donation": Donation,
          "supportUs.decor": Decor,
        })}
      </motion.div>
    </div>
  );
};

export default SupportUs;
