import { Hero } from "@components/home/hero";
import { Organisations } from "@components/home/organisations";
import { pageQuery, siteQuery } from "@lib/query";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { renderObjectArray } from "sanity-react-extra";
import { withDimensions } from "sanity-react-extra";

const query = pageQuery(groq`
  *[_type == "homePage"][0]{
    ...,
    carousel[]{
      ...,
      "image": ${withDimensions("image")}
    }
  }
`);

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const Home = (props: SanityProps<any>) => {
  console.log(props);

  const { page } = useSanityQuery(query, props).data;

  return (
    <div>
      {renderObjectArray(page.sections, {
        "homePage.hero": Hero,
        "homePage.organisations": Organisations,
      })}
    </div>
  );
};

export default Home;
