import { Container } from "@components/ui/container";
import { Hero } from "@components/visitor-info/hero";
import { pageQuery } from "@lib/query";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { renderObjectArray, withDimensions } from "sanity-react-extra";

const query = pageQuery(groq`
  *[_type == "visitorInfoPage"][0]{
    ...,
    sections[]{
        ..., 
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
    <Container className="py-3">
      {renderObjectArray(page.sections, {
        "visitorInfoPage.hero": Hero,
      })}
    </Container>
  );
};

export default VisitorInfo;
