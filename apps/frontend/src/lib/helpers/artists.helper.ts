import { ArtistsProps } from "@lib/@types/artists.types";
import { NextRouter, useRouter } from "next/router";

type TSelectedCountry = string | string[] | undefined;

/* 🚩 gatekeeper of the intended queries */
export const checkerForTheIntendedQuery = (filteringKeys: string[]) => {
  return filteringKeys.includes("country") || filteringKeys.includes("veneue");
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
      return filterdArtists;
    }
  }
  return allArtists;
};
