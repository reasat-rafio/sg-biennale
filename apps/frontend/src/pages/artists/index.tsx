import { FilteringLogic } from "@components/artists/filters/filtering-logic";
import { PageHeaderProps, PageHeading } from "@components/shared/page-heading";
import { Container } from "@components/ui/container";
import { siteQuery } from "@lib/query";
import useArtistsStore from "@stores/artists.store";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useCallback, useEffect } from "react";
import { renderObjectArray, withDimensions } from "sanity-react-extra";
import { ArtistsList } from "@components/artists/artist-list";
import { Filters } from "@components/artists/filters";

const query = groq`{
    "site": ${siteQuery},
    "page": *[_type == "artistListingPage"][0]{
      ...,
      sections[]{
        ...,
        'image': ${withDimensions("image")},
      }
    },
    "artists": *[_type == "artist"]{
        _id,
        name,
        slug,
        artworks[0...4]-> {
            _id,
            name,
            slug,
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
        images[] {
          ...,
          asset->{
            ...,
            metadata {
              dimensions
            }
          }
        },alphabetical
    }
}`;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
});

const Artists: NextPage<SanityProps> = (props) => {
  const { setAllArtists, setFilteredArtists } = useArtistsStore();
  const { artists, page } = useSanityQuery(query, props).data;
  useEffect(() => {
    setAllArtists(artists);
    setFilteredArtists(artists);
  }, [artists, setAllArtists, setFilteredArtists]);

  return (
    <>
      {renderObjectArray(page.sections, {
        pageHeading: useCallback(
          (props: PageHeaderProps) => (
            <Container>
              <PageHeading {...props} color="#C59986" />
            </Container>
          ),
          []
        ),
      })}
      <FilteringLogic>
        <Filters />
      </FilteringLogic>
      <ArtistsList />
    </>
  );
};

export default Artists;
