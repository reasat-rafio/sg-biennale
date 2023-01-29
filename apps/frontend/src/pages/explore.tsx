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
import { KV } from "@components/home/hero/kv";
import { Introduction } from "@components/home/introduction/introduction";
import { HighLight } from "@components/home/highlight";
import { News } from "@components/home/news/news";
import { Organisations } from "@components/home/organisation";
import { Team } from "@components/about/team";
import { AboutUs } from "@components/about/about-us";
import { PastEdition } from "@components/about/past-edition";
import { AboutSponsors } from "@components/about/about-sponsors";
import { CuratorialTeam } from "@components/about/curatorial-team";
import { Release } from "@components/press/release";
import { KitsInfo } from "@components/press/kits-info";
import ClosestEvent from "@components/programmes-and-events/closest-event";
import { Volunteer } from "@components/support-us/volunteer";
import { Donation } from "@components/support-us/donation";
import { ImageGallery } from "@components/visitor-info/image-gallery";
import { AccesibilityInfo } from "@components/visitor-info/accesibility-info";
import { Map } from "@components/visitor-info/map";

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
  "curatorialEssays": *[_type == "curatorialEssay"] | order(order asc) []{
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

        // ? adding every other schema component type here cause client wants it
        "homePage.kv": KV,
        "homePage.introduction": Introduction,
        "homePage.highlight": HighLight,
        "homePage.news": News,
        "homePage.organisations": Organisations,
        "aboutPage.curatorialTeam": CuratorialTeam,
        "aboutPage.team": Team,
        "aboutPage.aboutSponsors": AboutSponsors,
        "aboutPage.about": AboutUs,
        "aboutPage.pastEdition": PastEdition,
        "pressPage.release": Release,
        "pressPage.kitInfo": KitsInfo,
        "programmesEventsPage.closestEvent": ClosestEvent,
        "supportUs.volunteer": Volunteer,
        "supportUs.donation": Donation,
        "visitorInfoPage.imageGallery": ImageGallery,
        "visitorInfoPage.accesibilityInfo": AccesibilityInfo,
        "visitorInfoPage.map": Map,
      })}
    </>
  );
};

export default Explore;
