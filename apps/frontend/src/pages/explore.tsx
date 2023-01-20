import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { SanityProps } from "next-sanity-extra";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { siteQuery } from "@lib/query";
import { groq } from "next-sanity";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { useCallback } from "react";
import { Container } from "@components/ui/container";
import { PageHeaderProps, PageHeading } from "@components/shared/page-heading";
import { CuratorialEssay } from "@components/explore/curatorial-essay";
import { PublicationsCatalogues } from "@components/explore/publication-catalogue";
import { DirectoryOfTerm } from "@components/explore/directory-of-term";
import { MoreInfos } from "@components/common/more-info";

const query = groq`{
  "site": ${siteQuery},
  "page": *[_type == "explorePage"][0]{
    ...,
    sections[]{
      ...,
      "image": ${withDimensions("image")},
      images[] {
        ..., 
        asset->{
          ...,
          metadata {
            dimensions
          }
        }
      },
      publicationsAndCatalogues[]-> {
        header,
        slug,
        author,
        description,
        file {
          ...,
          asset->
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
      },
      moreInfos[]{
        ...,
        'image': ${withDimensions("image")},
      },
      curatorialEssays[]{
          ...,
          "image": ${withDimensions("image")},
      },
      kvs[] {
        ..., 
        asset->{
          ...,
          metadata {
            dimensions
          }
        }
      },
      teamCollection[] {
        ...,
        team->{
          ...,
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
      },
      aboutCollection[]{
        ...,
        'image': ${withDimensions("image")},
      },
      sponsorCollection[]{
        ...,
        'image': ${withDimensions("image")},
      },
      pastEditionCollection[]-> {
        ...,
        'image': ${withDimensions("image")},
      },
      releases[]-> {
          _id,
          header,
          description,
          slug,
          cta,
          file {
            ...,
            asset->
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
      },
      highlights[]->{
        _id,
        _type,
        name,
        title,
        description,
        slug,
        countries,
        location,
        startAt,
        images[] {
          ..., 
          asset->{
            ...,
            metadata {
              dimensions
            }
          }
        },
      },
      newsCollection [] {
        ...,
        "image": ${withDimensions("image")}
      },
      closestEvents[]->{
        _id,
        images[] {
          asset->{
            ...,
            metadata {
            dimensions
            }
          }
        },
        title,
        description,
        slug,
        startAt,
        venue[]-> {
          _id,
          name,
          slug
        },
        relatedArtists[] -> {
          _id,
          name
        },
      },
      shortGuide{
          ...,
          "icon": ${withDimensions("icon")},
          asset->
      },
      additionalInfo[]{
          ...,
          "icon": ${withDimensions("icon")}
        },
      }
    },
  "curatorialEssays": *[_type == "curatorialEssay"][]{
    _id,
    header,
    url,
    author,
    description,
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
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const Explore: NextPage<SanityProps> = (props) => {
  const { page, curatorialEssays } = useSanityQuery(query, props).data;

  return (
    <>
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
        "explorePage.curatorialEssay": useCallback(
          (data: any) => (
            <CuratorialEssay {...data} curatorialEssays={curatorialEssays} />
          ),
          []
        ),
        "explorePage.directoryOfTerm": DirectoryOfTerm,
        moreInfo: MoreInfos,
      })}
    </>
  );
};

export default Explore;
