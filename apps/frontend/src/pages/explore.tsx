import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { pageQuery } from "@lib/query";
import { groq } from "next-sanity";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { useCallback } from "react";
import { Container } from "@components/ui/container";
import { PageHeaderProps, PageHeading } from "@components/shared/page-heading";
import { CuratorialEssay } from "@components/explore/curatorial-essay";
import { PublicationsCatalogues } from "@components/explore/publication-catalogue";
import { DirectoryOfTerm } from "@components/explore/directory-of-term";

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

  return (
    <div>
      {renderObjectArray(page.sections, {
        pageHeading: useCallback(
          (data: PageHeaderProps) => (
            <Container>
              <PageHeading {...data} color="#292221" />
            </Container>
          ),
          []
        ),
        "explorePage.publicationAndCatalogue": PublicationsCatalogues,
        "explorePage.curatorialEssay": CuratorialEssay,
        "explorePage.directoryOfTerm": DirectoryOfTerm,
      })}
    </div>
  );
};

export default Explore;
