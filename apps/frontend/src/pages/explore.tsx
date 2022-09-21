import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { groq } from "next-sanity";
import { withDimensions } from "sanity-react-extra";

const query = pageQuery(groq`
    *[_type == "explorePage"][0]{
        ...,
        sections[]{
            ...,
            "image": ${withDimensions("image")},
            publicationsAndCatalogues[]{
                ...,
                "image": ${withDimensions("image")},
            },
            curatorialEssays[]{
                ...,
                "image": ${withDimensions("image")},
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

const Explore: NextPage<SanityProps> = (props) => {
  const { page } = useSanityQuery(query, props).data;

  return <div></div>;
};

export default Explore;
