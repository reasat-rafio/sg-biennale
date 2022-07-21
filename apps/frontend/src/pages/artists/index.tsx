import { ArtistsList } from "@components/artists/artists-list";
import { Filtering } from "@components/artists/filtering";
import { siteQuery } from "@lib/query";
import useArtistsStore from "@stores/artists-store";
import { sanityStaticProps, useSanityQuery } from "@utils/sanity";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { groq } from "next-sanity";
import { SanityProps } from "next-sanity-extra";
import { useEffect } from "react";

const query = groq`{
    "site": ${siteQuery},
    "artists": *[_type == "artist"]{
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
  const { artists } = useSanityQuery(query, props).data;

  useEffect(() => {
    setAllArtists(artists);
    setFilteredArtists(artists);
  }, [artists, setAllArtists, setFilteredArtists]);

  return (
    <div>
      <Filtering />
      <ArtistsList />
    </div>
  );
};

export default Artists;
