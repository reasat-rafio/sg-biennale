import { ArtistsProps } from "@lib/@types/artists.types";
import { NextRouter, useRouter } from "next/router";

type TSelectedCountry = string | string[] | undefined;

/* 🚩 gatekeeper of the intended queries */
export const checkerForTheIntendedQuery = (filteringKeys: string[]) => {
  return filteringKeys.includes("country") || filteringKeys.includes("venue");
};

export const filterLogicFactory = (
  allArtists: ArtistsProps[],
  router: NextRouter
): ArtistsProps[] => {
  const queryParamsNotEmpty = JSON.stringify(router.query) !== "{}";
  const queryKeys = Object.keys(router.query);

  if (queryParamsNotEmpty) {
    if (checkerForTheIntendedQuery(queryKeys)) {
      const selectedVenue = router.query.venue;
      const selectedCountry: TSelectedCountry = router.query.country;

      const filterdArtists = allArtists.filter((artist) => {
        if (selectedCountry) {
          if (typeof selectedCountry === "string") {
            return artist.countries.some(
              (country) => country.value === selectedCountry
            );
          } else {
            return selectedCountry.some((cntry) =>
              artist.countries.some(
                (artistCntry) => artistCntry.label === cntry
              )
            );
          }
        } else return artist;
      });
      // .filter((artist) => {
      //   if (selectedVenue) {
      //     if (typeof selectedVenue === "string") {
      //       return artist.venues?.some(
      //         (venue) => venue.slug.current === selectedVenue
      //       );
      //     } else {
      //       return selectedVenue.some((venue) =>
      //         artist.venues?.some(
      //           (artistVenue) => artistVenue.slug.current === venue
      //         )
      //       );
      //     }
      //   } else return artist;
      // });
      return filterdArtists;
    }
  }
  return allArtists;
};
