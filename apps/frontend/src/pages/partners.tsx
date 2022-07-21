import { PartnerList } from "@components/partners/partner-list";
import { Container } from "@components/ui/container";
import { siteQuery } from "@lib/query";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { withDimensions } from "sanity-react-extra";

const query = groq`{
  "site": ${siteQuery},
  "partners":*[_type == "partner"][]{
        ...,
        tier->{
          _id,
          title
        },
        'image': ${withDimensions("image")},
    },    
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const Partners: NextPage<SanityProps> = (props) => {
  const { partners } = useSanityQuery(query, props).data;

  return (
    <Container className="py-section">
      <PartnerList partners={partners} />
    </Container>
  );
};

export default Partners;
