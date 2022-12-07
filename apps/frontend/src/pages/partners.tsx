import { Greeting } from "@components/partners/greeting";
import { PartnerList } from "@components/partners/partner-list";
import { PageHeading } from "@components/shared/page-heading";
import { Container } from "@components/ui/container";
import { siteQuery } from "@lib/query";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { withDimensions } from "sanity-react-extra";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_type == "partnerListingPage"][0]{
    ...,
    partnersAndTiers[] {
      ...,
      partners[]{
        ...,
        'image': ${withDimensions("image")},
      }
    }
  },
  "partners":*[_type == "partner"][]{
        ...,
        tier->{
          _id,
          title,
          order
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
  const {
    page: { header, description, greetings, partnersAndTiers },
    partners,
  } = useSanityQuery(query, props).data;

  console.log(partnersAndTiers);

  return (
    <Container className="py-section">
      <PageHeading heading={header} tagline={description} />
      <PartnerList partners={partners} />
      <Greeting greetings={greetings} />
    </Container>
  );
};

export default Partners;
